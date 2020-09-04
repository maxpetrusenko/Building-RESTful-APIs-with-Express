const express = require('express')
const shortid = require("shortid");
var bodyParser = require('body-parser')
const apiRoutes = require('./api/apiRoutes');

const server = express();
server.use(bodyParser.json())
id = shortid.generate();

// server.use('/', (req, res) => res.send('API up and running!'));

server.get("/", function(req, res) {
    res.send("App is working 👍");
  });

server.use('/api', apiRoutes);


server.listen(5000, () => console.log('API running on port 5000'));