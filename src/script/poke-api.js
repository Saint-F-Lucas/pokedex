const pokeApi = {
  convertPokeAPIjsonToPokemonClass(pokemonDetail) {
    return console.log('')
  },

  getPokemonDetail(pokemon) {
    return fetch(pokemon.url).then(response => response.json())
  },

  //variables to use in the URL and do our pagination (offset & limit)
  getPokemons(offset = 0, limit = 5) {
    // URL to get data
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return (
      fetch(url)
        .then(response => response.json())
        // the responseBody.results
        .then(responseBody => responseBody.results)
        // This returns a list of all pokemons names and URL's
        .then(pokemons =>
          // This does a hole lot, it starts by looping though each pokemon
          pokemons.map(pokemon =>
            // fetches it's url
            fetch(pokemon.url)
              // converts the url content into json
              .then(response => response.json())
              // uses the json data to create a object
              .then(
                finalpokemon =>
                  new pokemonModel(
                    finalpokemon.name,
                    finalpokemon.id,
                    finalpokemon.types,
                    finalpokemon.sprites.other.dream_world.front_default
                  )
              )
          )
        )
        // makes the hole map fetching end before it goes foreword
        .then(detailRequests => Promise.all(detailRequests))
        // returns a list with the complete data
        .then(pokemonDetail => pokemonDetail)
        /*
      .then(responseBody => Promise.all(responseBody.url))
      .then(responseAll => responseAll.json())
      .then(responseAlljson => responseAlljson.results)
      */
        .catch(error => console.error(error))
    )
  }
}
