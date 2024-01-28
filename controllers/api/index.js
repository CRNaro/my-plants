const router = require('express').Router();
const userControllers = require('./userControllers');
const scheduleConntroller = require('./scheduleController');
const plantAPI = require('./plantAPI');
const plantController = require('./plantController');

//router.use('/getPlant', plantAPI);
router.use('/plant', plantController);
router.use('/user', userControllers);
router.use('/schedule', scheduleConntroller);

module.exports = router;