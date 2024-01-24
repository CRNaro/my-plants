const axios = require("axios");
require("dotenv").config();
const plantInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

// Plant List to get the plant ID
function getID() {
  const userInput = plantInput.value.trim(); 
  const listUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}`;
  if (userInput && userInput !== "") {
    axios
      .get(listUrl)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .then(function (data) {
        let id = data.id;
        console.log(id);
        getDetails(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Plant Detail to get plant info from the plant ID
function getDetails(id) {
  const detailUrl = `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`;
axios
  .get(detailUrl)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
  .then(function (data) {
    let commonName = data.common_name;
    console.log(commonName);
    let description = data.description;
    console.log(description);
    let watering = data.watering;
    console.log(watering);
    let sunlight = data.sunlight;
    console.log(sunlight);
    let poisonous = data.poisonous_to_pets;
    console.log(poisonous);
    let image = data.default_image.regular_url
    console.log(image);
  })
  .catch((error) => {
    console.log(error);
  });
}

const plantData = {
  commonName: 'req.body.common_name',
  description: 'req.body.description',
  watering: 'req.body.watering',
  sunlight: 'req.body.sunlight',
  poisonous: 'req.body.poisonous_to_pets',
  image: 'req.body.image_url'
}

fetch('/api/addPlant', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(plantData)
})
.then(response=> response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error)
})

submitBtn.addEventListener("click", getID);

