var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var instances = require('./instances.js');

/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);

/*
* Routes that can be accessed only by autheticated users
*/
router.get('/computedashboard/instances', instances.getAll);

module.exports = router;