async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  //// Task 1 ////
  // disabling the widget when it is not delected
  document.querySelector("#weatherWidget").style.display = "none";

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here";
  const url = "http://localhost:3003/api/weather";
  await axios.get(url)
  .then(resources => {
    // console.log(resources.data);
  })
  .catch(error => {
    console.log(error);
  });
  //// Task 2 ////
  // selecting a specific city in the dropdown
  document.querySelector("#citySelect").addEventListener("change", async event => {
    console.log("Changed city selection");
    try {
      ////Task 3 ////
      // disabling the dropdown & adding a loading prompt
      document.querySelector("#citySelect").setAttribute("disabled", "disabled");
      document.querySelector("#weatherWidget").style.display = "none";
      document.querySelector(".info").textContent = "Fetching weather data...";
      //// Task 4 ////
      // adding dynamics to selecting a city
      // console.log(event.target.value);
      let city = event.target.value;
      let url2 = `http://localhost:3003/api/weather?city=${city}`;
      const response = await axios.get(url2);
      const { data } = response;
      // console.log(data);
      //// Task 5 ////
      // re-enabling the info, dropdown, and disabling the fetching text as we now have access to the information
      document.querySelector("#weatherWidget").style.display = "block";
      document.querySelector(".info").textContent = "";
      document.querySelector("#citySelect").removeAttribute("disabled");
      //// building the dynamic widget ////
      const feelsLike         = document.querySelector("#apparentTemp div:nth-child(2)");
      feelsLike.textContent   = `${data.current.apparent_temperature}°`;
      const weatherIcon       = document.querySelector("#todayDescription");
      weatherIcon.textContent = descriptions.find((icon) => icon[0] === data.current.weather_description)[1];

      const tempRange     = document.querySelector("#todayStats div:nth-child(1)");
      const precipitation = document.querySelector("#todayStats div:nth-child(2)");
      const humidity      = document.querySelector("#todayStats div:nth-child(3)");
      const wind          = document.querySelector("#todayStats div:nth-child(4)");

      tempRange.textContent     = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
      precipitation.textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`;
      humidity.textContent      = `Humidity: ${data.current.humidity}%`;
      wind.textContent          = `Wind: ${data.current.wind_speed}m/s`;

      let weekDayNum = getDayNumber();
      //// dynamicly editing the forecast ////
      data.forecast.daily.forEach((item, index) => {
      let forecast = document.querySelectorAll(".next-day")[index];
      let forecastDay = forecast.children[0];
      let forecastIcon = forecast.children[1];
      let forecastRange = forecast.children[2];
      let forecastPrecipitation = forecast.children[3];

      forecastDay.textContent           = dayOfTheWeek(weekDayNum);
      weekDayNum++;
      if (weekDayNum > 6) { weekDayNum = 0; };
      forecastIcon.textContent          = descriptions.find((icon) => icon[0] === item.weather_description)[1]; //adding icons
      forecastRange.textContent         = `${item.temperature_min}°/${item.temperature_max}°`;
      forecastPrecipitation.textContent = `Precipitation: ${item.precipitation_probability * 100}%`;
      });
      document.querySelector("#location div:nth-child(1)").textContent = city; //adding the city name
    } catch (error) {
      console.log(`ERROR!! ERROR!! Everything has gone wrong!!: ${error.message}`);
    };
  });
    function dayOfTheWeek(dayNum) {
      const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return week[dayNum];
    };
    function getDayNumber() {
      return (new Date()).getDay();
    };

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
