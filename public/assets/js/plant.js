// const plantInput = document.getElementById("user-input").value;
const plantInfo = document.getElementsByClassName("plant-info");

let myList = document.getElementById("plant_info");
myList = [];

async function getPlant(event) {
  event.preventDefault();
  console.log("Button clicked");
  const plantName = document.getElementById("user-input").value;
  console.log(plantName);
  const plantDataURL = `/api/plant?plantName=${plantName}`; //added crn
  const response = await fetch(plantDataURL);
  const data = await response.json();

  if (response.ok) {
    console.log("RESPONSE!!!!!!", data);
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
  const response = await fetch("/api/plant", {
    method: "POST",
    body: JSON.stringify({
      common_name,
      description,
      watering,
      sunlight,
      poisonous_to_pets,
      image_url,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("Plants!!!", addPlant);
  if (response.ok) {
    // If successful, redirect the browser to the home page
    document.location.replace("/home");
    alert("Plant Saved");
  } else {
    alert(response.statusText);
  }
}
// Render the search results to the page
function renderPlants(plants) {
  console.log("YAY PLANTS!!", plants);
  const searchResultsContainer = document.getElementById("search-results");
  //   const plantInfoContainer = document.getElementById("plant-info");
  searchResultsContainer.innerHTML = "";

  return plants.map(plant => {

  const plantCard = document.createElement("div");
    plantCard.className = "plant-card";
    // //console.log("plants!?!?!", renderPlants)
    const plantName = document.createElement("h3");
    plantName.textContent = plant.common_name;
    let stringPlantWater = plant.watering || "Not specified";
    let stringPlantSun = plant.sunlight[0] || "Not specified";

    plantCard.dataset.watering = stringPlantWater;
    plantCard.dataset.sunlight = stringPlantSun;

    const plantImage = document.createElement("img");
     plantImage.src = plant.default_image.medium_url || "default_image_url"
    //plant.default_image.medium_url || "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",  // need to set the image
    plantImage.alt = `Image of ${plant.common_name}`;
    console.log("IMAGE!!!!", plantImage);
    const addButton = document.createElement("button");
    addButton.textContent = "Add to My List";
    //     addButton.dataset.plantId = plant.id; // Assign the plant's id to the button's data attribute

    //addButton.addEventListener("click", savePlantToAccount);

    plantCard.append(plantName, document.createTextNode(`Watering: ${stringPlantWater} Sunlight: ${stringPlantSun}`), plantImage, addButton);


    searchResultsContainer.append(plantCard);

    //     const plantInfo = document.createElement("div");
    //     plantInfo.className = "search-results";  //not plant-info
    plantInfo.innerHTML = `
     <h2 id="plant-name">${plant.common_name}</h2>
     <p> id="plantWater">${stringPlantWater}</p>
     <p> id="plantSun">${stringPlantSun}</p>

     <p id="description">${plant.description}</p>
    <img id="image" src=${plant.default_image.medium_url} alt="Image of ${plant.common_name}">
  `;
    //     plantInfoContainer.appendChild(plantInfo);
    //     console.log("Plants please!!!", plantInfo);

    addButton.addEventListener("click", addToMyList);
  });
}

function addToMyList(event) {
  const plantCard = event.currentTarget.parentNode;
  const plantName = plantCard.querySelector("h3").textContent;
  const plantImgSrc = plantCard.querySelector("img").src;

  const wateringInfo = plantCard.dataset.watering || "Not specified";
  const sunglightInfo = plantCard.dataset.sunlight || "Not specified";

  const plantData = {
    name: plantName,
    imageSrc: plantImgSrc,
    watering: wateringInfo,
    sunlight: sunglightInfo,
  };

  const listItem = document.createElement("li");
  listItem.innerHTML = `
  <h3>${plantData.name}</h3>
  <p>Watering: ${plantData.watering}</p>
  <p>Sunlight: ${plantData.sunlight}</p>
  <img src="${plantData.imageSrc}" alt="Image of ${plantData.name}">
  `;

  const myPlantList = document.getElementById("plant_info");
  myPlantList.appendChild(listItem);

  myList.push(plantData);
  //let userList = document.createElement("h3")
  //userList.append(myList)

  // ADD DELETE BUTTON - CRN
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";

  deleteButton.addEventListener("click", deletePlantFromList);
  listItem.appendChild(deleteButton);

  // save to database
  fetch('/api/plants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plantData),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}


async function searchPlants(event) {
  event.preventDefault();

  const plantName = document.getElementById("user-input").value;
  const searchURL = `/api/plant?plantName=${plantName}`;

  try {
    const response = await fetch(searchURL); //plantDataURL or searchURL?
    const json = await response.json();

    if (response.ok) {
      renderPlants(json.data.slice(0, 3)); // plants instead of json.data?
      //renderPlants(json.data);
    } else {
      throw new Error("Failed to fetch plants");
    }
  } catch (error) {
    console.error("Error", error);
  }
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", getPlant);
submitBtn.addEventListener("click", searchPlants);

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", addPlant);

//     <p id="watering">${plant.watering}</p>
//     <p id="sun">${plant.sunlight}</p>
//     <p id="poison">${plant.poisonous_to_pets}</p>
