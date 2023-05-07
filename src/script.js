function formatDate(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let dayOfWeek = days[new Date().getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let pm = false;
  if (hour >= 12) {
    hour -= 12;
    pm = true;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthOfYear = months[new Date().getMonth()];

  let currentDate = new Date();
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

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
console.log(formatDate);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(updateWeatherInfo);
}

function updateWeatherInfo(response) {
  updateCityName(response);
  showTemperature(response);
}

function updateCityName(response) {
  let cityName = response.data.name;
  console.log(response.data.name);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityName;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}
