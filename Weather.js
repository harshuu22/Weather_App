//fetching data from api
document.addEventListener("DOMContentLoaded", () => {
  let search_city = document.querySelector(".search-input");
  let city_name = document.querySelector(".city-name");
  let city_temp = document.querySelector(".city-temp");
  let city_disc = document.querySelector(".city-disc");
  let city_feel = document.querySelector(".city-feel");
  let city_pressure = document.querySelector(".city-pressure");
  let city_speed = document.querySelector(".city-speed");
  let city_humidity = document.querySelector(".city-humidity");
  let weather_icon = document.querySelector(".weather-icon");

  let city = "ahmedabad";

  search_city.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = document.querySelector(".cityname");
    city = cityName.value;
    WeatherData();
    cityName.value = "";
  });
  //fetching a weather data from api.
  const WeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a93392f5f15529c20c0317fb0375e9e5&units=metric`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      city_temp.innerHTML = `${data.main.temp}°C`;
      city_name.innerHTML = data.name;
      weather_icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      city_disc.innerHTML = data.weather[0].description;
      city_feel.innerHTML = data.main.feels_like;
      city_pressure.innerHTML = data.main.pressure;
      city_speed.innerHTML = data.wind.speed;
      city_humidity.innerHTML = data.main.humidity;
    } catch (e) {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.innerText =
        "⚠️ Fetch error: " +
        e.message +
        ". You might have entered a wrong city or made a spelling error.";
      errorMessage.classList.remove("hidden");
    }
  };
  WeatherData();
});
