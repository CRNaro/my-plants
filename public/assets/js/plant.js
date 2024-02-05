// const plantInput = document.getElementById("user-input").value;
const plantInfo = document.getElementsByClassName("plant-info");

let myList = document.getElementById("plant_info")
myList = [];

function userPlantData() {
  console.log("userPlantData", plantData)
}


async function getPlant(event) {
    event.preventDefault();
    //console.log("Button clicked")
    const plantName = document.getElementById("user-input").value;
    //console.log(plantName);
    const plantDataURL = `/api/plant?plantName=${plantName}` //added crn
    const response = await fetch(plantDataURL)
    const data = await response.json()

   if (response.ok) {
    plantData = {
      common_name: data.common_name,
      watering: data.watering,
      sunlight: data.sunlight,
      image_url: data.image_url,
};
     
      
      } else {
       alert(response.statusText);
    }
   //renderPlants();
    }
    
async function addPlant(event) {
    event.preventDefault();
    const common_name = document.getElementById("plant-name").value;
    const description = document.getElementById("description").value;
    const watering = document.getElementById("watering").value;
    const sunlight = document.getElementById("sun").value;
    const poisonous_to_pets = document.getElementById("poison").value;
    const image_url = document.getElementById("image").value;
  //   const response = await fetch('/api/plant', {
  //       method: 'POST',
  //       body: JSON.stringify({ common_name, description, watering, sunlight, poisonous_to_pets, image_url }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     const responseData = await response.json();
  //  //console.log('Plants!!!', addPlant)
  //     if (response.ok) {
  //       // If successful, redirect the browser to the home page
  //       document.location.replace('/home'); 
  //       alert('Plant Saved')
  //     } else {
  //       alert(response.statusText);
  //     }
}
// Render the search results to the page
function renderPlants(plants) {
 
   const searchResultsContainer = document.getElementById("search-results");
//   const plantInfoContainer = document.getElementById("plant-info");
  searchResultsContainer.innerHTML = "";
  return plants.map(plant => {
  
    const plantCard = document.createElement("div");
    plantCard.className = "plant-card";
 
    const plantName = document.createElement("h3");
    plantName.textContent = plant.common_name;
    let stringPlantWater = plant.watering || "Not specified";
    let stringPlantSun = plant.sunlight[0] || "Not specified";

    plantCard.dataset.watering = stringPlantWater;
    plantCard.dataset.sunlight = stringPlantSun;

    const plantImage = document.createElement("img");
     plantImage.src = plant.default_image.medium_url //|| "default_image_url"
    //plant.default_image.medium_url || "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",  // need to set the image
   plantImage.alt = `Image of ${plant.common_name}`;
  

  
    const addButton = document.createElement("button");
    addButton.textContent = "Add to My List";
    
    addButton.addEventListener('click', (e) => {
      
      const plantCard = e.currentTarget.parentNode;
      const watering = plantCard.dataset.watering;
      const sunlight = plantCard.dataset.sunlight;
    
      const myPlantList = document.getElementById("plant_info");
      e.currentTarget.remove();
      plantCard.parentNode.removeChild(plantCard);

      // const listItem = document.createElement("li");
      // listItem.innerHTML = `
      // <h3>${plantData.common_name}</h3>
      // <p>Watering: ${plantData.watering}</p>
      // <p>Sunlight: ${plantData.sunlight}</p>
      // <img class="plant-pic" src="${plantData.image_url}" alt="Image of ${plantData.name}">
      // `;
     

      myPlantList.appendChild(plantCard);
     
      //*!!*This is adding both cards somehow.  The top is rendered first followed by the bottom
      myPlantList.insertAdjacentHTML('beforeend', `
      
      `);
    });
      //Took the following out of the "insertAdjacentHTML" above
    // because it was adding the second 'undefined' card -CRN
    //  <div class="plant-card">
    // <h3>${plantData.common_name}</h3>
    // <p>Watering: ${plantData.watering}</p>
    // <p>Sunlight: ${plantData.sunlight}</p>
    // <img class="plant-pic" src="${plantData.image_url}" alt="Image of ${plantData.name}">
    // </div>

    const addBtn = document.getElementById("parent-button");
// addBtn.addEventListener('click', addToMyList);
//     addButton.dataset.plantId = plant.id; // Assign the plant's id to the button's data attribute
    
    //addButton.addEventListener("click", savePlantToAccount);
 
    plantCard.append(plantName, document.createTextNode(`Watering: ${stringPlantWater} Sunlight: ${stringPlantSun}`), plantImage, addButton);

   searchResultsContainer.append(plantCard);

//     const plantInfo = document.createElement("div");
//     plantInfo.className = "search-results";  //not plant-info
  //  plantInfo.innerHTML = `
  //    <h2 id="plant-name">${plant.common_name}</h2>
  //    <p> id="plantWater">${stringPlantWater}</p>
  //    <p> id="plantSun">${stringPlantSun}</p>

  //    <p id="description">${plant.description}</p>

  //   <img id="image" src=${plant.default_image.medium_url} alt="Image of ${plant.common_name}">
  // `;
//     plantInfoContainer.appendChild(plantInfo);
//     console.log("Plants please!!!", plantInfo);

  });
 };

 function addToMyList(event) {

  const plantCard = event.currentTarget.parentNode;
  const plantName = plantCard.querySelector('div').textContent;
  const plantImgSrc = plantCard.querySelector('img').src;

  const wateringInfo = plantCard.dataset.watering || "Not specified";
  const sunlightInfo = plantCard.dataset.sunlight || "Not specified";

  const plantData = {
    common_name: plantName,
    //description: 'No description available.',
    watering: wateringInfo,
    sunlight: sunlightInfo,
    image_url: plantImgSrc,
  };
 
 // Send plant data to the server

 
 fetch('/api/plant', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(plantData),
})
  .then((response) => response.json())
  //console.log("talk to me!!!!", response)
  .then((data) => console.log('Success in adding plant:', data))
  .catch((error) => console.error('Error:', error));
 

  // const listItem = document.createElement("li");
  // listItem.innerHTML = `
  // <h3>${plantData.common_name}</h3>
  // <p>Watering: ${plantData.watering}</p>
  // <p>Sunlight: ${plantData.sunlight}</p>
  // <img class="plant-pic" src="${plantData.image_url}" alt="Image of ${plantData.name}">
  // `;

  // const myPlantList = document.getElementById("plant_info");
  // //console.log("myPlantList", myPlantList, plantData)
  // myPlantList.appendChild(listItem);

  myList.push(plantData);
  let userList = document.createElement("h3")
  userList.append(myList)

 }
async function searchPlants(event) {
  event.preventDefault();

  const plantName = document.getElementById("user-input").value;
  const searchURL = `/api/plant?plantName=${plantName}`
  
  try {
  const response = await fetch(searchURL);  //plantDataURL or searchURL?
  const json = await response.json();

  if (response.ok) {
    renderPlants(json.data.slice(0, 3))  // plants instead of json.data?
    //renderPlants(json.data);
  
  } else {
    throw new Error('Failed to fetch plants');
  }
  } catch (error) {
    console.error('Error', error);
  }
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', getPlant); 
submitBtn.addEventListener('click', searchPlants);

// const addBtn = document.getElementById("parent-button");
// addBtn.addEventListener('click', addToMyList);


//     <p id="watering">${plant.watering}</p>
//     <p id="sun">${plant.sunlight}</p>
//     <p id="poison">${plant.poisonous_to_pets}</p>