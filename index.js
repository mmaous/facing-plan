'use strict';

const uuid = require('uuid/v4');
const client = require('./client');

// global values and helper functions
const image_base_url =
  'https://csdx.blob.core.windows.net/resources/Face/Images/';
const person_group_id = uuid();

// using the following function to wait for the training of the PersonGroup to complete.
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
