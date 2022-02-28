'use strict';

const uuid = require('uuid/dist/v4');
const { IMAGE_BASE_URL, client } = require('./client');
const IdentifyInPersonGroup = require('./IdentifyInPersonGroup');
const FindSimilar = require('./FindSimilar');

const DetectFaceExtract = require('./DetectFaceExtract');

const person_group_id = uuid();

// the main func
const fire = async () => {
  await DetectFaceExtract(client, IMAGE_BASE_URL);
  await FindSimilar();
  await IdentifyInPersonGroup(client, person_group_id);
  console.log('Done');
};

fire();
