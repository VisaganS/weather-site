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
  
  const fiveDayData = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}${units}`);
  fiveDayData.then(result =>{
    
    console.log(result.data)


    //get each day's temp
    arrTemp= [result.data.list[0].main.temp,result.data.list[5].main.temp,result.data.list[10].main.temp,result.data.list[17].main.temp,
    result.data.list[25].main.temp];
    console.log(arrTemp);

    //get each day's image code
    arrImg = [result.data.list[0].weather[0].icon,result.data.list[5].weather[0].icon,result.data.list[10].weather[0].icon,
    result.data.list[17].weather[0].icon,result.data.list[25].weather[0].icon];
    console.log(arrImg);

    const weekEl = document.querySelector(".week");

    for(let i = 0; i < arrTemp.length; i++){
    let weekDayEl = document.createElement("div");
    weekDayEl.classList.add("week-day");

    let weekDayHeadEl = document.createElement("div");
    weekDayHeadEl.classList.add("week-day__head");
    weekDayHeadEl.innerText = "Mon";
    weekDayEl.appendChild(weekDayHeadEl);
    

    let weekDayIconEl = document.createElement("img");
    weekDayIconEl.classList.add("week-day__icon");
    weekDayIconEl.src = `https://openweathermap.org/img/wn/${arrImg[i]}@2x.png`;
    weekDayEl.appendChild(weekDayIconEl);

    let weekDayTempEl = document.createElement("div");
    weekDayTempEl.classList.add("week-day__temp");
    weekDayTempEl.innerText = `${Math.trunc(arrTemp[i])} `;
    weekDayEl.appendChild(weekDayTempEl);

    let weekDay
    weekEl.appendChild(weekDayEl);
    }
  }).catch(error => {
    console.error(error);
  });

}).catch(error => {
  console.error(error);
});
