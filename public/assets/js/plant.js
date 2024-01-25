async function getPlant(event) {
    event.preventDefault();
    const plantInput = document.getElementById("user-input").value;
    const plantInfo = document.getElementsByClassName("plant-info");
    const common_name = document.getElementById("plant-name");
    const description = document.getElementById("description");
    const watering = document.getElementById("watering");
    const sunlight = document.getElementById("sun");
    const poisonous_to_pets = document.getElementById("poison");
    const image_url = document.getElementById("image");

    let response = await fetch('/api/plant', {
        method: 'GET',
        body: JSON.stringify({
            common_name,
            description,
            watering,
            sunlight,
            poisonous_to_pets,
            image_url,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let response2 = await fetch('/api/plant', {
        method: 'POST',
        body: JSON.stringify({
            common_name,
            description,
            watering,
            sunlight,
            poisonous_to_pets,
            image_url,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to get plant');
    }
    
}
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('submit', getPlant);