'use strict';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const AddFacesToPersonGroup = async (
  client,
  image_base_url,
  person_dictionary,
  person_group_id,
) => {
  console.log('Adding faces to person group...');
  // The similar faces will be grouped into a single person group person.

  await Promise.all(
    Object.keys(person_dictionary).map(async (key) => {
      const value = person_dictionary[key];

      // Wait briefly so we do not exceed rate limits.
      await sleep(1000);

      // try {
      let person = await client.personGroupPerson.create(person_group_id, {
        name: key,
      });
      // } catch (error) {
      //   console.error(error.message);
      // }
      console.log('Create a person group person: ' + key + '.');

      // Add faces to the person group person.
      await Promise.all(
        value.map(async (similar_image) => {
          // Check if the image is of sufficent quality for recognition.
          let sufficientQuality = true;
          let detected_faces = await client.face.detectWithUrl(
            image_base_url + similar_image,
            {
              returnFaceAttributes: ['QualityForRecognition'],
              detectionModel: 'detection_03',
              recognitionModel: 'recognition_03',
            },
          );
          detected_faces.forEach((detected_face) => {
            if (detected_face.faceAttributes.qualityForRecognition != 'high') {
              sufficientQuality = false;
            }
          });

          // Quality is sufficent, add to group.
          if (sufficientQuality) {
            console.log(
              'Add face to the person group person: (' +
                key +
                ') from image: ' +
                similar_image +
                '.',
            );
            await client.personGroupPerson.addFaceFromUrl(
              person_group_id,
              person.personId,
              image_base_url + similar_image,
            );
          }
        }),
      ).catch((err) => console.error(err.message));
    }),
  ).catch((err) => console.error(err.message));

  console.log('Done adding faces to person group.');
};

const WaitForPersonGroupTraining = async (person_group_id) => {
  // Wait so we do not exceed rate limits.
  console.log('Waiting 10 seconds...');
  await sleep(10000);
  let result = await client.personGroup.getTrainingStatus(person_group_id);
  console.log('Training status: ' + result.status + '.');
  if (result.status !== 'succeeded') {
    await WaitForPersonGroupTraining(person_group_id);
  }
};

const DetectFaceRecognize = async (url) => {
  // Detect faces from image URL. Since only recognizing, use the recognition model 4.
  // We use detection model 3 because we are only retrieving the qualityForRecognition attribute.
  // Result faces with quality for recognition lower than "medium" are filtered out.
  let detected_faces = await client.face.detectWithUrl(url, {
    detectionModel: 'detection_03',
    recognitionModel: 'recognition_04',
    returnFaceAttributes: ['QualityForRecognition'],
  });
  return detected_faces.filter(
    (face) =>
      face.faceAttributes.qualityForRecognition == 'high' ||
      face.faceAttributes.qualityForRecognition == 'medium',
  );
};

const IdentifyInPersonGroup = async (client, image_base_url) => {
  console.log('========IDENTIFY FACES========');
  console.log();

  // Create a dictionary for all your images, grouping similar ones under the same key.
  const person_dictionary = {
    'set1-Dad': ['set1-Dad1.jpg', 'set1-Dad2.jpg'],
    'set1-Mom': ['set1-Mom1.jpg', 'set1-Mom2.jpg'],
    'set1-Son': ['set1-Son1.jpg', 'set1-Son2.jpg'],
    'set1-Daughter': ['set1-Daughter1.jpg', 'set1-Daughter2.jpg'],
    'set2-Lady': ['set2-Lady1.jpg', 'set2-Lady2.jpg'],
    'set2-Man': ['set2-Man1.jpg', 'set2-Man2.jpg'],
  };

  // A group photo that includes some of the persons you seek to identify from your dictionary.
  let source_image_file_name = 'identification1.jpg';

  // Create a person group.
  console.log('Creating a person group with ID: ' + person_group_id);
  await client.personGroup.create(person_group_id, {
    name: person_group_id,
    recognitionModel: 'recognition_04',
  });

  await AddFacesToPersonGroup(
    client,
    image_base_url,
    person_dictionary,
    person_group_id,
  );

  // Start to train the person group.
  console.log();
  console.log('Training person group: ' + person_group_id + '.');
  await client.personGroup.train(person_group_id);

  await WaitForPersonGroupTraining(person_group_id);
  console.log();

  // Detect faces from source image url and only take those with sufficient quality for recognition.
  let face_ids = (
    await DetectFaceRecognize(image_base_url + source_image_file_name)
  ).map((face) => face.faceId);
  // Identify the faces in a person group.
  let results = await client.face.identify(face_ids, {
    personGroupId: person_group_id,
  });
  await Promise.all(
    results.map(async (result) => {
      let person = await client.personGroupPerson.get(
        person_group_id,
        result.candidates[0].personId,
      );
      console.log(
        'Person: ' +
          person.name +
          ' is identified for face in: ' +
          source_image_file_name +
          ' with ID: ' +
          result.faceId +
          '. Confidence: ' +
          result.candidates[0].confidence +
          '.',
      );
    }),
  );
  console.log();
};

module.exports = IdentifyInPersonGroup