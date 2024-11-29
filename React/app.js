const API_KEY ='e3c2258d46bf91aa62475f1979fc714d'
const BASE_URL ='https://api.openweathermap.org/data/2.5/weather';

const cityInput =document.getElementById('city');
const getWeatherButton = document.getElementById('getWeather');
const weatherDiv=document.getElementById('weather');
const loader=document.getElementById('loader');

async function fetchWeather(city) {
    try {
      showLoader(true);
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        throw new Error('City not found!');
      }
      const data = await response.json();
      console.log(data);
      displayWeather(data);
    } catch (error) {
      weatherDiv.textContent = error.message;
    }
    finally {
      showLoader(false);
    }
  }
  
  // Function to display weather
  function displayWeather(data) {
    const { name, main, weather } = data;
    weatherDiv.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature: ${main.temp}°C</p>
      <p>Condition: ${weather[0].description}</p>
      <p>Humidity: ${main.humidity}%</p>
    `;
  }
  function showLoader(isLoading) {
    loader.style.display = isLoading ? 'block' : 'none';
  }
  
  
  // Event listener for button click
  getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    } else {
      weatherDiv.textContent = 'Please enter a city name!';
    }
  });
  