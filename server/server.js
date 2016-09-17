const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const database = require('./config/database.js');
const router = require('./config/router.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.get('*', (req,res) => {
  res.sendFile(path.resolve('client', 'index.html'));
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  //database.ensureSchema();
  //moment().format('h:mm:ss a') 
  console.log('Server is Listening on port', app.get('port'));
});