require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const server = require('http').createServer(app);

app.use(cors());

routes(app);

server.listen(process.env.PORT || 3001, () => {
  console.log('Server listening at port %d', server.address().port);
});
