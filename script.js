document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWhetherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const CityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");

  const description = document.getElementById("description");
  const errMsg = document.getElementById("error-message");

  const API_KEY = "a6b603db0715f11c2cd5a25e423badbf";

  getWhetherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // It may throw an error

    // Server / database is always in another  continent

    try {
      const wetherData = await fetchWeatherData(city);
      displayWeatherData(wetherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // get the data
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    const response = await fetch(url)
    console.log(typeof response)
    
    console.log("Reponse",response);

    if(!response.ok){
        throw new Error("City not found ");
    }
   const data = await response.json();
   return data;
  }

  function displayWeatherData(data) {
    // display
    console.log(data);
    const {name , main , weather } = data
    CityName.textContent = name;
    temperature.textContent = `Temperature : ${main.temp}`;
    description.textContent = `Temperature : ${weather[0].description}`;


    // unlock the display 

    weatherInfo.classList.remove("hidden");
    errMsg.classList.add('hidden');

  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errMsg.classList.add("hidden");
  }

  
});
