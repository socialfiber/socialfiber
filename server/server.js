const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');

const app = express();
const database = require('./config/database.js');
const router = require('./config/router.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./client'));
app.use('/client', express.static('./node_modules'));
app.use('/', router);

app.get('*', (req,res) => {
  res.sendFile(path.resolve('./', 'client', 'index.html'));
});

const users = require('./users/users-ctrl.js');
app.post('/auth/signup', users.signup);
app.post('/auth/signin', users.signin);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  //database.ensureSchema();
  console.log(`[${moment().format('h:mm:ss a')}] Server is now listening on port ${app.get('port')}`);
});
