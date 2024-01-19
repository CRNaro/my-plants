const router = require('express').controllers();
const userControllers = require('./usercontroller');
const scheduleConntrollers = require('./scheduleController');
const plantControllers = require('./plantController');

router.use('/user', userControllers);
router.use('/schedule', scheduleConntrollers);
router.use('/plant', plantControllers)

module.exports = router;