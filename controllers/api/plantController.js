const axios = require('axios');
require('dotenv').config();


const url = `https://perenual.com/api/species-list?key=${process.env.API_KEY}`;

axios.get(url)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});