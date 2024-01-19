const router = require('express').Router();
const { Plant, User, Schedule } = require('../models');
const withAuth = require('../utils/auth');

//Display all plants in users list
router.get('/', async (req, res) => {
    try {
      const plantData = await Plant.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const plants = plantData.map((plant) => plant.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('home', { 
        plants, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Display individual plant
  router.get('/plant/:id', async (req, res) => {
    try {
      const plantData = await Plant.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const plant = plantData.get({ plain: true });
  
      res.render('plantPage', {
        ...plant,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Prevent access to page unless logged in
  router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Plant }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('home', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
