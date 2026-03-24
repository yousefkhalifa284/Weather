const nameToday = document.getElementById('nameToday');
const dateToday = document.getElementById('dateToday');
const nameTomorow = document.getElementById('nameTomorow');
const nextTomorrowDay = document.getElementById('nextTomorrowDay');
const cityName = document.getElementById('cityName');
const todayDgree = document.getElementById('todayDgree');
const weatherState = document.getElementById('weatherState');
const rain = document.getElementById('rain');
const wind = document.getElementById('wind');
const direction = document.getElementById('direction');
const maximumTemperatureTomorrow = document.getElementById('maximumTemperatureTomorrow');
const minimumTemperatureTomorrow = document.getElementById('minimumTemperatureTomorrow');
const weatherStateTomorrow = document.getElementById('weatherStateTomorrow');
const maximumTemperatureNextTomorrow = document.getElementById('maximumTemperatureNextTomorrow');
const minimumTemperatureNextTomorrow = document.getElementById('minimumTemperatureNextTomorrow');
const weatherStateNextTomorrow = document.getElementById('weatherStateNextTomorrow');
const imgToday = document.getElementById('imgToday');
const imgTomorrow = document.getElementById('imgTomorrow');
const imgNextTomorrow = document.getElementById('imgNextTomorrow');
const inputSearch = document.querySelector('input');


async function autoSearch(city) {
  if (city.length < 1) return;

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=60f10a5badde4acaa6f132647251811&q=${city}`);
    const data = await response.json();

    if (data.length > 0) {
      const firstCity = data[0].name;
      getWeather(firstCity);
    }

  } catch (err) {
    console.log("Search error:", err);
  }
}

async function getWeather(city = "Cairo") {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=60f10a5badde4acaa6f132647251811&q=${city}&days=3&aqi=no&alerts=no`
    );

    const data = await response.json();
    console.log(data);

    const localTime = data.location.localtime;
    const dateObj = new Date(localTime);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    nameToday.innerHTML = dayName;

    const dayNumber = dateObj.getDate();
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
    dateToday.innerHTML = `${dayNumber} ${monthName}`;

    const tomorowDate = data.forecast.forecastday[1].date;
    const tomorowObj = new Date(tomorowDate);
    nameTomorow.innerHTML = tomorowObj.toLocaleDateString('en-US', { weekday: 'long' });

    const nextTomorrowDate = data.forecast.forecastday[2].date;
    const nextTomorrowObj = new Date(nextTomorrowDate);
    nextTomorrowDay.innerHTML = nextTomorrowObj.toLocaleDateString('en-US', { weekday: 'long' });

    todayDgree.innerHTML = data.current.temp_c + 'C';
    weatherState.innerHTML = data.current.condition.text;
    cityName.innerHTML = data.location.name;
    rain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain + '%';
    wind.innerHTML = data.current.wind_kph + 'km/h';
    direction.innerHTML = data.current.wind_dir;

    maximumTemperatureTomorrow.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + 'C';
    minimumTemperatureTomorrow.innerHTML = data.forecast.forecastday[1].day.mintemp_c + 'C';
    weatherStateTomorrow.innerHTML = data.forecast.forecastday[1].day.condition.text;

    maximumTemperatureNextTomorrow.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + 'C';
    minimumTemperatureNextTomorrow.innerHTML = data.forecast.forecastday[2].day.mintemp_c + 'C';
    weatherStateNextTomorrow.innerHTML = data.forecast.forecastday[2].day.condition.text;

    imgToday.src = 'https:' + data.current.condition.icon;
    imgTomorrow.src = 'https:' + data.forecast.forecastday[1].day.condition.icon;
    imgNextTomorrow.src = 'https:' + data.forecast.forecastday[2].day.condition.icon;

  } catch (error) {
    console.error('Error', error);
  }
}


getWeather();


inputSearch.addEventListener("keyup", () => {
  autoSearch(inputSearch.value);
});
