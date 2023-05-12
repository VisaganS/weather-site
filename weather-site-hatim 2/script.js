const apiKey = '&appid=28e9edd8d1cede1c14b31dea008f36f7';
const units = '&units=metric';
let city = "Mississauga,";
let state = 'ON,';
let countryCode = 'CA';
let lat;
let lon;
let temp;
let feelsLike;
let cityLocation;
let wind;
let weatherStatus;
let weatherIcon;
let mondayTemp;
let tuesdayTemp;
let wednesdayTemp;
let thursdayTemp;
let fridayTemp;
let monImg;
let tueImg;
let wedImg;
let thuImg;
let friImg;

//43.6534817
//-79.3839347

const geoData = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}${state}${countryCode}${apiKey}${units}`);
geoData.then(result => {

  lat = result.data[0].lat;
  lon = result.data[0].lon;
  //console.log(lat, lon);

  const mainData = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}${units}`);
  mainData.then(result => {
    // console.log(result.data);
    cityLocation = result.data.name;
    feelsLike = result.data.main.feels_like;
    wind = result.data.wind.speed * 3.6;
    weatherStatus = result.data.weather[0].main;
    weatherIcon = result.data.weather[0].icon;
    // console.log(weatherIcon);

  }).catch(error => {
    console.error(error);
  });
  
  const fiveDayData = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}${units}`);
  fiveDayData.then(result =>{
    
    console.log(result.data)


    //get each day's temp
    mondayTemp = result.data.list[0].main.temp;
    tuesdayTemp = result.data.list[5].main.temp;
    wednesdayTemp = result.data.list[10].main.temp;
    thursdayTemp = result.data.list[17].main.temp;
    fridayTemp = result.data.list[25].main.temp;

    //get each day's image code
    monImg = result.data.list[0].weather[0].icon;
    tueImg = result.data.list[5].weather[0].icon;
    wedImg = result.data.list[10].weather[0].icon;
    thuImg = result.data.list[17].weather[0].icon;
    friImg = result.data.list[25].weather[0].icon;
  }).catch(error => {
    console.error(error);
  });

}).catch(error => {
  console.error(error);
});

//poke api
// const mainData = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}${units}`);
// mainData.then(result => {
//   console.log(result.data);
// }) .catch (error => {
//   console.error(error);
// });

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