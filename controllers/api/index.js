const router = require('express').Router();
const userControllers = require('./userControllers');
const scheduleConntroller = require('./scheduleController');

router.use('/user', userControllers);
router.use('/schedule', scheduleConntroller);

module.exports = router;