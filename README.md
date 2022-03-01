# Facing Plan

<div align="center"><img src="https://user-images.githubusercontent.com/17799273/156180213-e748af3d-fee2-4b38-b73e-698c5cc110c2.jpg" width="150" height="150" atl="Rick the Logo"/></div>

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
## About <a name = "about"></a>

This repository demonstrate the concept of Face recognition, specificly, Face client library for JavaScript. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images.

>The Azure Face service provides AI algorithms that detect, recognize, and analyze human faces in images. Facial recognition software is important in many different scenarios, such as identity verification, touchless access control, and face blurring for privacy.

### *Feel Free to mess around with the provided demo*

## Getting Started <a name = "getting_started"></a>

### Prerequisites
 - The latest version of [Node.js](https://nodejs.org/en/)
 - [Azure Storage Account]
 - [Face API]

### Installing

Download the respository, And install dependencies :

```bash
$ git clone https://github.com/mmaous/facing-plan.git

$ cd facing-plan

$ npm install
```

After Creating [Face API], You will need to copy the key and endpoint from  `Keys and Endpoint` in the sidebar, In order to connect your application to the Face API.


* Now, create `Container` in your [Azure Storage Account], give it Public access level of `Container`, Click `Create`.
  Then, Click the three dots, Choose `Container properties`, Copy the URL.

* Create a file named `.env`, And paste the key, endpoint and URL: 

```py
ENDPOINT = "<YOUR_ENDPOINT>"

KEY = "<YOUR_KEY>"

IMAGE_BASE_URL =
  'https://<Storage account Name>.blob.core.windows.net/<Container Name>/'
```

## Usage <a name = "usage"></a>

Execute the script: 
```bash
$ npm start
```

>NOTE: You can upload, content of `img` folder to your container to test `DetectFaceExtract.js` script, Compare the output with the `result.txt`

[Face API]: https://portal.azure.com/#create/Microsoft.CognitiveServicesFace
[Azure Storage Account]: https://portal.azure.com/#create/Microsoft.StorageAccount