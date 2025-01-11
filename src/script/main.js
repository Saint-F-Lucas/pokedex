//In this code we are using the fetch API library to get data from a pokemon API and use this data to fill our page with pokemons

//Some functions in this code are in other file, to do it we imported it in the HTML

/* this is the affective request for the data, this is a asynchronous processing, this means that the request is a promise 
for data. 
The them property allows you to use the the data from the URL, if it doesnt work it will show the error with the catch 
property and finally does something regardless of the succes of the request.
*/
/*
fetch(url)
  .then(function (response) {
    response.json().then(function (responseBody) {
      console.log(responseBody)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
  .finally(function () {
    console.log('Requisition concluted')
  })
*/
// to avoid calling the inside then you can call after and the other and this will make the code cleaner

/*
function convertPokemonTypeTohtml(pokemonType) {
  return pokemonType.map(
    classType => `
              <li class="type">${classType.type.name}</li>`
  )
}*/

const pokemonListhtlmElement = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecord = 154 // 251
let limit = 15
let offset = 0

/*
function convertPokemonTohtml(pokemon) {
  return `
          <li class="pokemon ${pokemon.firstType}">
          <span class="number">${pokemon.pokemonNumber}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map(type => `<li class="type ${type}">${type}</li>`)
                .join('')}
            </ol>
            <img
              src="${pokemon.image}"
              alt="${pokemon.name}"
            />
          </div>
        </li>
  `
}*/

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then(
    (pokemonList = []) =>
      (pokemonListhtlmElement.innerHTML += pokemonList
        .map(
          pokemon => `
          <li class="pokemon ${pokemon.firstType}">
          <span class="number">${pokemon.pokemonNumber}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map(type => `<li class="type ${type}">${type}</li>`)
                .join('')}
            </ol>
            <img
              src="${pokemon.image}"
              alt="${pokemon.name}"
            />
          </div>
        </li>
  `
        )
        .join(''))
  )
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const nextqnt = limit + offset
  if (nextqnt >= maxRecord) {
    debugger
    const newLimit = maxRecord - offset
    console.log(offset)
    loadPokemonItens(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
    return
  } else {
    loadPokemonItens(offset, limit)
  }
})

/*
  1° version
  const pokemonhtmlList = []
  for (let index = 0; index < pokemonList.length; index++) {
    const pokemon = pokemonList[index]
    pokemonhtmlList.push(convertPokemonTohtml(pokemon, index + 1))
  }

  2° version
   better study this, but its getting the array from the getPokemons as usable data,
   Inside the map we gave a function that returns a list just like the for function bellow
   You can use a function and the map will iterate the list as a value for the function
  let newPokemonList = pokemonList.map(pokemon => convertPokemonTohtml(pokemon))
    newPokemonList = newPokemonList.join('')
    pokemonListhtlmElement.innerHTML = newPokemonList
  */
