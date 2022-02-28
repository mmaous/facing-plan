'use strict';

// const uuid = require('uuid');
const client = require('./client');
const DetectFaceExtract = require('./DetectFaceExtract');

// global values and helper functions
const image_base_url =
  'https://test1azure1api1storage.blob.core.windows.net/faces/';
// const person_group_id = uuid();

// using the following function to wait for the training of the PersonGroup to complete.
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


DetectFaceExtract(client, image_base_url);
