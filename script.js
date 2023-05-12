const apiKey = '&appid=28e9edd8d1cede1c14b31dea008f36f7';
const units = '&units=metric';
let city = "Mississauga,";
let state = 'ON,';
let countryCode = 'CA';
let lat;
let lon;
let temp;
let feelsLike;
let wind;
let weatherStatus;
let weatherIcon;

//43.6534817
//-79.3839347

const geoData = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}${state}${countryCode}${apiKey}${units}`);
geoData.then(result => {

  lat = result.data[0].lat;
  lon = result.data[0].lon;
  //console.log(lat, lon);

  const mainData = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}${units}`);
  mainData.then(result => {
    console.log(result.data);   
    
    temp = result.data.main.temp;
    feelsLike = result.data.main.feels_like;
    wind = result.data.wind.speed * 3.6;
    weatherStatus = result.data.weather[0].main;
    weatherIcon = result.data.weather[0].icon;

    const weatherCard = document.querySelector(".card__temp");
    weatherCard.innerText = `${Math.trunc(temp)} °C`;
    
    const cardIcon = document.querySelector(".card__icon");
    cardIcon.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    const cardStatus = document.querySelector(".card__status");
    cardStatus.innerText = weatherStatus;

    const cardFeelsLike = document.querySelector("#feels-like");
    cardFeelsLike.innerText = `${Math.trunc(feelsLike)} °C`;

    const cardWind = document.querySelector("#wind");
    cardWind.innerText = `${Math.round(wind)} km/h`;


  }).catch(error => {
    console.error(error);
  });
  
  const fiveDayData = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}`);
  fiveDayData.then(result =>{
    console.log(result.data);
  })

}).catch(error => {
  console.error(error);
});
