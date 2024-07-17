// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const routes = require('./routes');
const exp = require('constants');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // for parsing application/x-www-form-urlencoded
app.use('/api', routes);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
