const { DetectFaceRecognize } = require('./IdentifyInPersonGroup');
const { client } = require('../config');

const FindSimilar = async (image_base_url) => {
  console.log('========FIND SIMILAR========');
  console.log();

  const source_image_file_name = 'findsimilar.jpg';
  const target_image_file_names = [
    'set1-Dad1.jpg',
    'set1-Daughter1.jpg',
    'set1-Mom1.jpg',
    'set1-Son1.jpg',
    'set2-Lady1.jpg',
    'set2-Man1.jpg',
    'set3-Lady1.jpg',
    'set3-Man1.jpg',
  ];

  let target_face_ids = (
    await Promise.all(
      target_image_file_names.map(async (target_image_file_name) => {
        // Detect faces from target image url.
        var faces = await DetectFaceRecognize( client,
          image_base_url + target_image_file_name,
        );
        console.log(
          faces.length +
            ' face(s) detected from image: ' +
            target_image_file_name +
            '.',
        );
        return faces.map((face) => face.faceId);
      }),
    )
  ).flat();

  // Detect faces from source image url.
  let detected_faces = await DetectFaceRecognize(client,
    image_base_url + source_image_file_name,
  );

  // Find a similar face(s) in the list of IDs. Comapring only the first in list for testing purposes.
  let results = await client.face.findSimilar(detected_faces[0].faceId, {
    faceIds: target_face_ids,
  });
  results.forEach((result) => {
    console.log(
      'Faces from: ' +
        source_image_file_name +
        ' and ID: ' +
        result.faceId +
        ' are similar with confidence: ' +
        result.confidence +
        '.',
    );
  });
  console.log();
};

module.exports = FindSimilar;
