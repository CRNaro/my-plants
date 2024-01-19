const axios = require("axios");
require("dotenv").config();

// Plant List to get the plant ID
function getID() {
  const userInput = element.value.trim(); //replace element with the element variable
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
  })
  .catch((error) => {
    console.log(error);
  });
}

getID();