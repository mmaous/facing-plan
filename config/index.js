'use strict';

const microsoftRest = require('@azure/ms-rest-js');
const Face = require('@azure/cognitiveservices-face');

//load the .env file params in process.env
require('dotenv').config();

const KEY = process.env.KEY;
const ENDPOINT = process.env.ENDPOINT;

// credentials
const credentials = new microsoftRest.ApiKeyCredentials({
  inHeader: { 'Ocp-Apim-Subscription-key': KEY },
});

const client = new Face.FaceClient(credentials, ENDPOINT);

module.exports = { client, IMAGE_BASE_URL: process.env.IMAGE_BASE_URL };
