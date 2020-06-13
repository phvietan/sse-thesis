require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const { FRONTEND_PORT, BACKEND_PORT } = process.env;

app.use(cors({origin: `http://127.0.0.1:${FRONTEND_PORT}`}));

app.get('/list', (req, res) => {
  res.send('Hello World!');
});

app.listen(
  BACKEND_PORT,
  () => console.log(`Example app listening at http://localhost:${BACKEND_PORT}`),
);