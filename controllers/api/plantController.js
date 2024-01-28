const router = require("express").Router();
const Plant = require("../../models/Plant");
const API_KEY = process.env.API_KEY;
const axios = require("axios");

router.post('/', async (req, res) => {
  console.log('hi', req.body)
  try {
    const plantData = await Plant.create({
      common_name: req.body.common_name,
      description: req.body.description,
      watering: req.body.watering,
      sunlight: req.body.sunlight,
      poisonous_to_pets: req.body.poisonous_to_pets,
      image_url: req.body.image_url,
    });
    res.status(200).json(plantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Display individual plant
router.get('/plant/:id', async (req, res) => { //replace with '/:id'
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


  router.get('/', async (req,res) => {
    //console.log("query params", req.query)
    //console.log("backend!!!!!", req.query.plantName)
    const plantName = req.query.plantName
    const listURL = `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`;
    console.log(listURL);
    const response = await fetch(listURL)
    const json = await response.json()
  
    //console.log("response!!!!!", response.data.data)
    //return res.status(200).json(JSON.stringify(json))
    if (response.status === 200){
      console.log("Plants!!!!", json)
     res.status(200).json(json)
     //return {data: json}
     //res.json(JSON.parse(json.data))
    }
  });

   //Delete plant from list
   router.delete('/plant/:id', async (req, res) => {
    try{
      const plantToDelete = await Plant.findByPk(req.params.id)
      if(!plantToDelete) {
        return res.status(404).json({ error: 'Plant not found'});
      }
      await plantToDelete.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
