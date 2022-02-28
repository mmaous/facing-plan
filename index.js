'use strict';

const microsoftRest = require('@azure/ms-rest-js');
const Face = require('@azure/cognitiveservices-face');
const uuid = require('uuid/v4');

//load the .env file params in process.env
require('dotenv').config();

const KEY = process.env.KEY;
const ENDPOINT = process.env.ENDPOINT;

// credentials
const credentials = new microsoftRest.ApiKeyCredentials({
  inHeader: { 'Ocp-Apim-Subscription-key': KEY },
});

const client = new Face.FaceClient(credentials, ENDPOINT);

// global values and helper functions
const image_base_url =
  'https://csdx.blob.core.windows.net/resources/Face/Images/';
const person_group_id = uuid();
