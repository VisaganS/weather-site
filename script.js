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

  const pokeApiUrl = 'https://pokeapi.co/api/v2';

  const pokeListContainer = document.querySelector(".pokemonlist-container");
  const pokeContainer = document.querySelector(".pokemon-container");

  const addOption = (pokeArray) => {
    pokeArray.forEach((pokemon) => {
      const listItem = document.createElement('option');
      listItem.innerText = pokemon.name
      listItem.value = pokemon.name
      pokeListContainer.append(listItem)
    })
  }

  const addPic = (url) => {
    axios.get(url)
    .then((response) => {
      pokeContainer.innerHTML = '';
      const img = document.createElement("img");
      img.setAttribute('src', response.data.sprites.front_default);
      pokeContainer.appendChild(img);
    })
  }

  axios.get(pokeApiUrl + "/pokemon")
    .then(response => {
      addOption(response.data.results);
      // response.data.results.forEach((pokemon) => {
      //   const listItem = document.createElement('option');
      //   listItem.innerText = pokemon.name
      //   listItem.value = pokemon.name
      //   pokeListContainer.append(listItem)
      // })
      return response.data.results[0];
      // THIS GETS RETURNED TO THE NEXT CHAINED .THEN
    })
    .then((pokemon) => {
      console.log(pokemon.url)
      addPic(pokemon.url)
    });

    pokeListContainer.addEventListener("change", (event) => {
      addPic(pokeApiUrl + '/pokemon/' + event.target.value )
      //axios.get(pokeApiUrl + '/pokemon/' + event.target.value )
      // .then((response) => {
      //   pokeContainer.innerHTML = '';
      //   const img = document.createElement("img");
      //   img.setAttribute('src', response.data.sprites.front_default);
      //   pokeContainer.appendChild(img);
      // })
    })