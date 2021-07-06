require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const router = require('./router/router');

const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || 'localhost';
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});