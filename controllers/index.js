const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes =require('./homeRoutes');
const scheduleController = require('./scheduleController');
const plantController = require('./plantController');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);
router.use('/schedule', scheduleController);
router.use('/plant', plantController);

module.exports = router;