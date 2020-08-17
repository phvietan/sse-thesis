require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./src/middlewares');

const BACKEND_PORT = process.env.BACKEND_PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cors({origin: `http://127.0.0.1:${FRONTEND_PORT}`}));
app.use(cors({origin: '*'}));

global.__uploadDir = path.join(__dirname, 'upload');

function setupMiddlewares() {
  app.use(middlewares.filterNonString);
  app.use(middlewares.createClientObject);
}

function setupApiEndpoints() {
  const apiUser = require('./src/api/user');
  const apiFile = require('./src/api/file');
  const apiSearch = require('./src/api/search');
  const apiDelete = require('./src/api/delete');
  const apiUpload = require('./src/api/upload');

  const apiEndpoints = {
    user: '/api/user',
    file: '/api/file',
    search: '/api/search',
    delete: '/api/delete',
    upload: '/api/upload',
  };

  app.use(apiEndpoints.user, apiUser);
  app.use(apiEndpoints.file, apiFile);
  app.use(apiEndpoints.search, apiSearch);
  app.use(apiEndpoints.delete, apiDelete);
  app.use(apiEndpoints.upload, apiUpload);
}

async function main() {
  setupMiddlewares();
  setupApiEndpoints();
  app.use(middlewares.handleNoneEndpoints);
  app.use(middlewares.handleResult);
  app.listen(
    BACKEND_PORT,
    () => console.log(`Example app listening at http://localhost:${BACKEND_PORT}`),
  );
}

main();