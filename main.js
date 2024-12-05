const apiKey = "196660a3ceab11a1b840e963cae647d1"; // Replace with your OpenWeatherMap API key
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

document.getElementById("get-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  const weatherApp = document.querySelector(".weather-app");
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetch(`${weatherUrl}?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("city").textContent = `City: ${data.name}`;
      document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

      // Set background effect based on weather description
      const description = data.weather[0].description.toLowerCase();

      if (description.includes("clear")) {
        weatherApp.style.background = "linear-gradient(to right, #f6d365, #fda085)"; // Sunny effect
        weatherApp.style.color = "#333";
      } else if (description.includes("cloud")) {
        weatherApp.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)"; // Cloudy effect
        weatherApp.style.color = "#fff";
      } else if (description.includes("rain")) {
        weatherApp.style.background = "linear-gradient(to right, #00c6ff, #0072ff)"; // Rainy effect
        weatherApp.style.color = "#fff";
      } else if (description.includes("snow")) {
        weatherApp.style.background = "linear-gradient(to right, #e6f7ff, #cce7ff)"; // Snow effect
        weatherApp.style.color = "#333";
      } else if (description.includes("thunderstorm")) {
        weatherApp.style.background = "linear-gradient(to right, #373b44, #4286f4)"; // Thunderstorm effect
        weatherApp.style.color = "#fff";
      } else {
        weatherApp.style.background = "linear-gradient(to right, #d3cce3, #e9e4f0)"; // Default effect
        weatherApp.style.color = "#333";
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
