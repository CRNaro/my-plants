const router = require('express').Router();
const userControllers = require('./userControllers');
const scheduleConntrollers = require('./scheduleController');

router.use('/user', userControllers);
router.use('/schedule', scheduleConntrollers);

module.exports = router;