const router = require('express').Router();
const userControllers = require('./userControllers');
const scheduleConntrollers = require('./scheduleController');
const plantControllers = require('./plantController');

router.use('/user', userControllers);
router.use('/schedule', scheduleConntrollers);
router.use('/plant', plantControllers)

module.exports = router;