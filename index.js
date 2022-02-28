'use strict';

// const uuid = require('uuid');
const { IMAGE_BASE_URL, client } = require('./client');
const DetectFaceExtract = require('./DetectFaceExtract');

// global values and helper functions
//************* */
// using the following function to wait for the training of the PersonGroup to complete.
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// const person_group_id = uuid();


DetectFaceExtract(client, IMAGE_BASE_URL);
