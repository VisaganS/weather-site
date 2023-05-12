const apiKey = '&appid=28e9edd8d1cede1c14b31dea008f36f7';
const units = '&units=metric';
let city;
let state;
let countryCode;
let lat = 40.7128;
let lon = 74.0060;
let temp;
let feelsLike;
let wind;
let weatherStatus;
let weatherIcon;

const body = document.querySelector("body");
console.log(body.style.background)

function makeRequest(lat, lon) {

    
    console.log(lat, lon);
  
    const mainData = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}${units}`);
    mainData.then(result => {
      console.log(result.data);   
      
      temp = result.data.main.temp;
      feelsLike = result.data.main.feels_like;
      wind = result.data.wind.speed * 3.6;
      weatherStatus = result.data.weather[0].main;
      weatherIcon = result.data.weather[0].icon;

      const sunrise = new Date((result.data.sys.sunrise + result.data.timezone) * 1000)
      console.log(sunrise)
  
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
      weekEl.innerHTML = "";
  
      for(let i = 0; i < arrTemp.length; i++){
      let weekDayEl = document.createElement("div");
      weekDayEl.classList.add("week-day");
  
      let weekDayHeadEl = document.createElement("div");
      weekDayHeadEl.classList.add("week-day__head");
        if(i === 0){
          weekDayHeadEl.innerText = "Sat";
        }else if(i == 1){
         weekDayHeadEl.innerText = "Sun";
        }else if(i == 2){
          weekDayHeadEl.innerText = "Mon";
        }else if(i == 3){
          weekDayHeadEl.innerText = "Tue";
        }else{
          weekDayHeadEl.innerText = "Wed";
        }




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
  
 
}

makeRequest(lat, lon);


const dropdown = document.querySelector("#dropdown");
let activeDropdown = document.querySelector("#current-city");

const toronto = document.querySelector("#toronto");
const london = document.querySelector("#london");
const florida = document.querySelector("#florida");
const york = document.querySelector("#york")



toronto.addEventListener("click", (e) => {
    return (activeDropdown.innerText = e.target.innerText,
    makeRequest(43.6532, 79.3832)
    )
    
}
  );
london.addEventListener("click", (e) => {
  return (activeDropdown.innerText = e.target.innerText,
    makeRequest(51.5072, 0.1276)
    )
});
florida.addEventListener("click", (e) => {
   return (activeDropdown.innerText = e.target.innerText,
  makeRequest(25.4479, 80.4792))
  

});
york.addEventListener("click", (e) => {
  return (activeDropdown.innerText = e.target.innerText,
  makeRequest(40.7128, 74.0060))
  
});



// const jsObj = {name: "Austin", place: "Brazil"};

// const jsonString = JSON.stringify(jsObj);

// console.log(jsObj);
// console.log(jsonString);

// const anObjAgain = JSON.parse(jsonString);

// console.log(anObjAgain.name)

// console.log("check 1");

// const myData = axios.get("https://pokeapi.co/api/v2");
// myData.then(result => {
//   const berries = axios.get(result.data.berry);
//   berries.then(result => {
//     console.log(result.data);
//   })
// });
// myData.catch(error => {console.log(error)});

// console.log("check 2") // THIS WILL RUN BEFORE LINE 18

// WITH CHAINING

// axios
//   .get("https://pokeapi.co/api/v2")
//   .then(result => {
//     console.log(result.data)
//   }).catch(error => {
//     console.log(error)
//   });

  // POST REQUEST

  // const myPostData = {
  //   title: "hey this is fun!",
  //   body: "This is the funnest thing in the world",
  //   userId: 27
  // }

  // axios
  //   .post("https://jsonplaceholder.typicode.com/posts", myPostData)
  //   .then(response => console.log(response.data))
  //   .catch(error => console.log(error));

  // const pokeApiUrl = 'https://pokeapi.co/api/v2';

  // const pokeListContainer = document.querySelector(".pokemonlist-container");
  // const pokeContainer = document.querySelector(".pokemon-container");

  // const addOption = (pokeArray) => {
  //   pokeArray.forEach((pokemon) => {
  //     const listItem = document.createElement('option');
  //     listItem.innerText = pokemon.name
  //     listItem.value = pokemon.name
  //     pokeListContainer.append(listItem)
  //   })
  // }

  // const addPic = (url) => {
  //   axios.get(url)
  //   .then((response) => {
  //     pokeContainer.innerHTML = '';
  //     const img = document.createElement("img");
  //     img.setAttribute('src', response.data.sprites.front_default);
  //     pokeContainer.appendChild(img);
  //   })
  // }

  // axios.get(pokeApiUrl + "/pokemon")
  //   .then(response => {
  //     addOption(response.data.results);
  //     // response.data.results.forEach((pokemon) => {
  //     //   const listItem = document.createElement('option');
  //     //   listItem.innerText = pokemon.name
  //     //   listItem.value = pokemon.name
  //     //   pokeListContainer.append(listItem)
  //     // })
  //     return response.data.results[0];
  //     // THIS GETS RETURNED TO THE NEXT CHAINED .THEN
  //   })
  //   .then((pokemon) => {
  //     console.log(pokemon.url)
  //     addPic(pokemon.url)
  //   });

  //   pokeListContainer.addEventListener("change", (event) => {
  //     addPic(pokeApiUrl + '/pokemon/' + event.target.value )
  //     //axios.get(pokeApiUrl + '/pokemon/' + event.target.value )
  //     // .then((response) => {
  //     //   pokeContainer.innerHTML = '';
  //     //   const img = document.createElement("img");
  //     //   img.setAttribute('src', response.data.sprites.front_default);
  //     //   pokeContainer.appendChild(img);
  //     // })
  //   })