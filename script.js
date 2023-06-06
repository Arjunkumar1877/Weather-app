const apiKey = "517c904f07b7d1ca9b8dadf46f172913";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  weatherData(cityValue);
});

const weatherData = async (cityValue) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw Error("Network error");
    }

    const data = await response.json();
    console.log(data);

    const details = [
      `Feels like: ${data.main.feels_like}℃`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];
    document.querySelector(".temperature").innerText = `${data.main.temp}℃`;

    document.querySelector(".description").innerText =
      data.weather[0].description;

    const icon = data.weather[0].icon;

    document.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather" >`;

    document.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");
  } catch (error) {
    
    document.querySelector(".temperature").innerText = "";

    document.querySelector(".description").innerHTML = `<h1> Error Occurs Try Again...</h1>`;


    document.querySelector(
      ".icon"
    ).innerHTML = "";

    document.querySelector(".details").innerHTML = "";

  }
};
