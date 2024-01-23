const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes =require('./homeRoutes');
const scheduleController = require('./scheduleController');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);
router.use('/schedule', scheduleController);

module.exports = router;