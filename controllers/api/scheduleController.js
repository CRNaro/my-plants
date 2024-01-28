// This will be the controller for the schedule and will handle the various HTTP requests for managing the schedule
const { Plant, Schedule } = require("../../models");
const router = require('express').Router();

// GET route to retrieve all the schedules with associated plant and user
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [{ model: Plant }, { model: User }],
      where: { user_id: req.session.user_id }, // is the session needed in the request? --CRN
    });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ err: "internal server error" });
  }
})

  // POST route to create a new schedule

  router.post ('/', async (req, res) => {
      try {
        const { plantId, wateringTime, frequency, waterAmount } = req.body;
        const newSchedule = await Schedule.create({
          plantId,
          wateringTime,
          frequency,
          waterAmount,
          user_id: req.session.user_id,
        });
        res.status(200).json(newSchedule);
      } catch (err) {
        res.status(500).json({ err: "internal server error" });
      }
    },
  );
  // DELETE route to delete a schedule

  router.delete ('/', async (req, res) => {
    try {
      const { scheduleId } = req.params;
      const schedule = await Schedule.findByPk(scheduleId);
      if (!schedule) {
        return;
        res.status(404).json({ err: "no schedule found with this id" });
      }
      await Schedule.destroy({ where: { id: scheduleId } });
    } catch (err) {
      res.status(500).json({ err: "internal server error" });
    }
  });


module.exports = scheduleController;



// This section is for the watering timer // 

//watering fequency //
var wateringCategories = {
  frequently: "Frequntly",
  moderate: "moderate",
  rarely: "Rarely"
};

// watering intervals in days for each category //
 var wateringIntervals = {
  frequently: 1, 
  moderate: 3,
  rarely : 7
 };

 //plant api data //
 async function fetchplantData() {  
try{
  var response = await fetch ("put in the api url ")
 var plantdata = await response.json() ;
 return plantdata;
} catch (error) {
  console.error (" Error fetching plant data ", error );
  return [];
}

}
// catgorize plants based on watering needs //
async function catgorizePlants() {
  var plantdata = await fetchplantData();

  const catgorizePlants = plantdata.map(plant=> {
    var wateringNeeds = plant.wateringNeeds.toLowercase();
    
    return {
      ...Plant,
      category: wateringCategories[wateringNeeds]
    };
  });
}
// This function shows the pop up notification//
function showNotification(plantName, wateringCategory) {
  var notificationMessage ="its time to water your ${plantName}! (${wateringCategory} watering)";
  alert(notificationMessage);
}

//This function schedule notification by the palnt categories //
function scheduleNotifications(categorizedPlants) {
  categorizedPlants.array.forEach(element => {
    var { name,category } = plant;
    var wateringIntervals = wateringIntervals[category];

    setInterval( () => {
      showNotification( name, category);
    }, wateringIntervals * 20 * 60 * 60 * 1000); // convert days to millisecond 
  });
}
// Call the categotizeation and notification scheduling functions//
categorizedPlants(). then( categorizedPlants => {
  scheduleNotifications( categorizedPlants);
});

module.exports = router;

