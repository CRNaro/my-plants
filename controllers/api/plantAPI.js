const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;






router.post("/", async (req, res) => {
  const plantName = req.body.plantName;
  const listUrl = `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`;
  let plantID;
  axios
    .get(listUrl)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      let id = response.data.id; // added .data to response -CRN
      console.log(id); // added  -CRN
      // getDetails(id); // added -CRN
      return response.data;
    })
    .then(function (data) {
      plantID = data.id;
      console.log(plantID);
    
    })
    .catch((error) => {
      console.log(error);
    });

  const detailUrl = `https://perenual.com/api/species/details/${plantID}?key=${API_KEY}`;

  
  axios
    .get(detailUrl)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    //   return response.data;
    // })
    .then((response) => {
      //remove below
      // let commonName = response.data.common_name;
      // console.log("commonName  " + commonName);

      // let description = response.data.description;
      // console.log("description  " + description);

      // let watering = response.data.watering;
      // console.log(watering);

      // let sunlight = response.data.sunlight;
      // console.log(sunlight);

      // let poisonous = response.data.poisonous_to_pets;
      // console.log(poisonous);

      // let image = response.data.default_image.regular_url;
      // console.log(image);
      //remove above
      const plant = {
        common_name: response.data.common_name,
        description: response.data.description,
        watering: response.data.watering,
        sunlight: response.data.sunlight,
        poisonous_to_pets: response.data.poisonous_to_pets,
        image_url: response.data.default_image.regular_url,
      };
      console.log("plant: " + plant);
      // res.render("home", { plant });
      res.render('home', { posts, loggedIn: req.session.logged_in }); 
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

// const axios = require("axios");
// require("dotenv").config();
// const plantInput = document.getElementById("user-input");
// const submitBtn = document.getElementById("submit-btn");
// const plantInfo = document.getElementsByClassName("plant-info");
// const plantName = document.getElementById("plant-name");
// const plantDescription = document.getElementById("description");
// const plantWater = document.getElementById("watering");
// const plantSunlight = document.getElementById("sun");
// const petPoison = document.getElementById("poison");
// const plantImage = document.getElementById("image");
// // fetch

// // Plant List to get the plant ID
// function getID() {
//   const userInput = plantInput.value.trim(); //backend doesn't know what this is.... User Input should be const userInput = req.body.plantInput
//   const listUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&plant=${userInput}`; // added the &plant=${userInput} to the end of the listUrl -CRN
//   if (userInput && userInput !== "") {
//     axios
//       .get(listUrl)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         let id = response.data.id; // added .data to response -CRN
//         console.log(id); // added  -CRN
//         getDetails(id); // added -CRN
//         //return response.data;
//       })
//       .then(function (data) {
//         let id = data.id;
//         console.log(id);
//         getDetails(id);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

// // Plant Detail to get plant info from the plant ID
// function getDetails(id) {
//   const detailUrl = `https://perenual.com/api/species/details/${id}?key=${API_KEY}`;
//   axios
//     .get(detailUrl)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       return response.data;
//     })
//     .then(function (data) {
//       let commonName = data.common_name;
//       console.log(commonName);
//       plantName.textContent = commonName;
//       plantInfo.textContent = plantName.textContent;
//       let description = data.description;
//       console.log(description);
//       plantDescription.textContent = description;
//       plantInfo.textContent = plantDescription.textContent;
//       let watering = data.watering;
//       console.log(watering);
//       plantWater.textContent = watering;
//       plantInfo.textContent = plantWater.textContent;
//       let sunlight = data.sunlight;
//       console.log(sunlight);
//       plantSunlight.textContent = sunlight;
//       plantInfo.textContent = plantSunlight.textContent;
//       let poisonous = data.poisonous_to_pets;
//       console.log(poisonous);
//       petPoison.textContent = "Poisonous to Pets:" + poisonous;
//       plantInfo.textContent = petPoison.textContent;
//       let image = data.default_image.regular_url;
//       console.log(image);
//       plantImage.src = image;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// const plantData = {
//   commonName: "req.body.common_name",
//   description: "req.body.description",
//   watering: "req.body.watering",
//   sunlight: "req.body.sunlight",
//   poisonous: "req.body.poisonous_to_pets",
//   image: "req.body.image_url",
// };

// fetch("/api/addPlant", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(plantData),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Success:", data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });


