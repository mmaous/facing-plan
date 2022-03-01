'use strict';

const { v4: uuidv4 } = require('uuid');
const { IMAGE_BASE_URL, client } = require('./client');
const { IdentifyInPersonGroup } = require('./IdentifyInPersonGroup');
const FindSimilar = require('./FindSimilar');

const DetectFaceExtract = require('./DetectFaceExtract');

const person_group_id = uuidv4();

// the main func
const fire = async () => {
  await DetectFaceExtract(client, IMAGE_BASE_URL);
  await FindSimilar(IMAGE_BASE_URL);
  await IdentifyInPersonGroup(client, person_group_id);
  console.log('Done');
};

fire();
