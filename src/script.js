let celsiusActive = true;
let cityResult = "Kerman";

let apiKey = "397b6cfabf43773o0a3b49c408t16f89";

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=`;
// update city name
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch");
  if (city.value) {
    let cityResult = `${city.value}`;
    axios
      .get(`${apiUrl}${cityResult}&key=${apiKey}&units=metric`)
      .then(showTemperature);
    celsiusActive = true;
  } else {
  }
}

let citySearch = document.querySelector("#search");
citySearch.addEventListener("submit", getCity);

// convert to FH
function convertFH(event) {
  event.preventDefault();
  if (celsiusActive === true) {
    let updateFH = document.querySelector(".current-city-temp");
    let temp = parseInt(updateFH.innerHTML);
    updateFH.innerHTML = `${Math.round((temp * 9) / 5 + 32)}°F`;
    celsiusActive = false;
    convertCelsius.classList.remove("active");
    convertFahrenheit.classList.add("active");
  } else {
  }
}
//convert to CS
function convertCS(event) {
  event.preventDefault();
  if (celsiusActive === false) {
    let tempToCS = document.querySelector(".current-city-temp");
    let temp = parseInt(tempToCS.innerHTML);
    let updateCS = document.querySelector(".current-city-temp");
    let convertCS = Math.round(((temp - 32) * 5) / 9);
    updateCS.innerHTML = `${convertCS}°C`;
    celsiusActive = true;
    convertFahrenheit.classList.remove("active");
    convertCelsius.classList.add("active");
  } else {
  }
}

// show current date/time information
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = days[new Date().getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let pm = false;
  if (hour >= 12) {
    hour -= 12;
    pm = true;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDate = new Date();
  let monthOfYear = months[new Date().getMonth()];
  let dayOfMonth = currentDate.getDate();

  let timeString = `${hour}:${minute.toString().padStart(2, "0")}`;
  if (pm) {
    timeString += "pm";
  } else {
    timeString += "am";
  }

  return `${dayOfWeek}, ${monthOfYear} ${dayOfMonth}; ${timeString}`;
}

let date = document.querySelector("#date");
date.innerHTML = `${formatDate(new Date())}`;

// capture temp conversion clicks
let convertFahrenheit = document.querySelector("#convert-fahrenheit");
convertFahrenheit.addEventListener("click", convertFH);

let convertCelsius = document.querySelector("#convert-celsius");
convertCelsius.addEventListener("click", convertCS);

// show temperature of searched city
function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let temperatureDesc = document.querySelector("#temperature-description");
  temperatureDesc.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let feelsLike = document.querySelector("#feels");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let updateTime = document.querySelector(".last-updated");
  updateTime.innerHTML = formatDate(response.data.time * 1000);
  let currentIcon = document.querySelector("#main-icon");
  currentIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  currentIcon.setAttribute("alt", `${response.data.condition.description}`);
}
// show temperature of geolocation city
function showTemperatureLoc(response) {
  let temperature = Math.round(response.data.daily[0].temperature.day);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let temperatureDesc = document.querySelector("#temperature-description");
  temperatureDesc.innerHTML = response.data.daily[0].condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.daily[0].temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Windspeed: ${Math.round(
    response.data.daily[0].wind.speed
  )}km/h`;
  let currentIcon = document.querySelector("#main-icon");
  currentIcon.setAttribute(
    "src",
    `${response.data.daily[0].condition.icon_url}`
  );
  currentIcon.setAttribute(
    "alt",
    `${response.data.daily[0].condition.description}`
  );
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let updateTime = document.querySelector(".last-updated");
  updateTime.innerHTML = formatDate(response.data.daily[0].time * 1000);
}
axios
  .get(`${apiUrl}${cityResult}&key=${apiKey}&units=metric`)
  .then(showTemperature);

// API weather last updated
function formatDate(timestamp) {
  let updateDate = new Date(timestamp);
  let hours = updateDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = updateDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[updateDate.getDay()];
  let date = updateDate.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[updateDate.getMonth()];
  let year = updateDate.getFullYear();
  return ` last updated: ${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
}

// show temperature of current location
function showPosition(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let locUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;
  axios.get(`${locUrl}`).then(showTemperatureLoc);
  celsiusActive = true;
}

function getCurrentPosition(position) {
  console.log(navigator.geolocation.getCurrentPosition(showPosition));
}

let currentLoc = document.querySelector("#location");
currentLoc.addEventListener("click", getCurrentPosition);

// show forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row"`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
       <div class="row forecast-day">${formatDay(forecastDay.time)}</div>
       <div class="row">

       <div class="col forecast-icon">
         <img src=
        "${forecastDay.condition.icon_url}" alt=
      "${forecastDay.condition.description}"></div>

       </div>
       <div class="row forecast-desc">${forecastDay.condition.description}</div>
       <div class="row forecast-temp">
         <span class="forecast-min">${Math.round(
           forecastDay.temperature.minimum
         )}°C</span> |
         <span class="forecast-max">${Math.round(
           forecastDay.temperature.maximum
         )}°C</span>
       </div>
       
     </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "397b6cfabf43773o0a3b49c408t16f89";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
//call forecast
function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let temperatureDesc = document.querySelector("#temperature-description");
  temperatureDesc.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let feelsLike = document.querySelector("#feels");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let updateTime = document.querySelector(".last-updated");
  updateTime.innerHTML = formatDate(response.data.time * 1000);
  let currentIcon = document.querySelector("#main-icon");
  currentIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  currentIcon.setAttribute("alt", `${response.data.condition.description}`);
  getForecast(response.data.coordinates);
}
