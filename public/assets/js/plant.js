// const plantInput = document.getElementById("user-input").value;
const plantInfo = document.getElementsByClassName("plant-info");

async function getPlant(event) {
    event.preventDefault();
    console.log("Button clicked")
    const plantName = document.getElementById("user-input").value;
    console.log(plantName);
    const response = await fetch('/api/getPlant', {
        method: 'POST',
        body: JSON.stringify({ plantName }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    // const common_name = document.getElementById("plant-name");
    // const description = document.getElementById("description");
    // const watering = document.getElementById("watering");
    // const sunlight = document.getElementById("sun");
    // const poisonous_to_pets = document.getElementById("poison");
    // const image_url = document.getElementById("image");

    // let response = await fetch('/api/plant', {
    //     method: 'GET',
    //     body: JSON.stringify({
    //         common_name,
    //         description,
    //         watering,
    //         sunlight,
    //         poisonous_to_pets,
    //         image_url,
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    // let response2 = await fetch('/api/plant', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         common_name,
    //         description,
    //         watering,
    //         sunlight,
    //         poisonous_to_pets,
    //         image_url,
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    // if (response.ok) {
    //     document.location.replace('/');
    // } else {
    //     alert('Failed to get plant');
    // }
    
}

async function addPlant(event) {
    event.preventDefault();
    const common_name = document.getElementById("plant-name").value;
    const description = document.getElementById("description").value;
    const watering = document.getElementById("watering").value;
    const sunlight = document.getElementById("sun").value;
    const poisonous_to_pets = document.getElementById("poison").value;
    const image_url = document.getElementById("image").value;
    const response = await fetch('/api/plant', {
        method: 'POST',
        body: JSON.stringify({ common_name, description, watering, sunlight, poisonous_to_pets, image_url }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/home'); 
        alert('Plant Saved')
      } else {
        alert(response.statusText);
      }
}



const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', getPlant);

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener('click', addPlant);