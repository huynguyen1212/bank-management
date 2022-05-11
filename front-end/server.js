const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config({
  path: path.resolve(__dirname, `.env`),
});

app.use(cors());
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 6061;

console.log('' + new Date().toLocaleTimeString() + ': port', port);

app.listen(port, () => console.log(`Server running on ${port}`));