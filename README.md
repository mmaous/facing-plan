# Facing Plan

<div align="center"><img src="https://user-images.githubusercontent.com/17799273/156180213-e748af3d-fee2-4b38-b73e-698c5cc110c2.jpg" width="170" height="170" atl="Rick the Logo"/></div>

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This repository demonstrate the concept of Face recognition, specificly, Face client library for JavaScript. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images.

> The Azure Face service provides AI algorithms that detect, recognize, and analyze human faces in images. Facial recognition software is important in many different scenarios, such as identity verification, touchless access control, and face blurring for privacy.

### _Feel Free to mess around with the provided demo_

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

After Creating [Face API], You will need to copy the key and endpoint from `Keys and Endpoint` in the sidebar, In order to connect your application to the Face API.

- Now, create `Container` in your [Azure Storage Account], give it Public access level of `Container`, Click `Create`.
  Then, Click the three dots, Choose `Container properties`, Copy the URL.

- Create a file named `.env`, And paste the key, endpoint and URL:

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

> NOTE: You can upload, content of `img` folder to your container to test `DetectFaceExtract.js` script, Compare the output with the `result.txt`

### File Tree Structure

```bash
.
├── img
│   ├── img-1.jpg
│   ├── ...
│   └── img-6.jpg
├── scripts
│   ├── DetectFaceExtract.js
│   ├── FindSimilar.js
│   └── IdentifyInPersonGroup.js
├── config
│   └── index.js
├── index.js
├── README.md
└── package.json
```

- Here's what's included:

  - img – Contains images.
  - scripts – Contains JavaScript files (demos for Face client library).
    - DetectFaceExtract.js - Defines a method which parses and prints the attribute data for each detected face.
    - FindSimilar.js - Contains the code which takes a single detected face (source) and searches a set of other faces (target) to find matches (face search by image). When it finds a match, it prints the ID of the matched face to the console.
    - IdentifyInPersonGroup.js - Contains set of functions which help to Identify a face, This operation takes an image of a person (or multiple people) and looks to find the stored person object associated with each face in the image (facial recognition search). It compares each detected face to a PersonGroup, a database of different Person objects whose facial features are known. `In order to do the Identify operation, you first need to create and train a PersonGroup.`
  - config - Defines configurations for [Face Client Library](https://www.npmjs.com/package/@azure/cognitiveservices-face).
  - index.js - Contains the main (fire) Function to test the scripts in `scripts` folder.

[face api]: https://portal.azure.com/#create/Microsoft.CognitiveServicesFace
[azure storage account]: https://portal.azure.com/#create/Microsoft.StorageAccount
