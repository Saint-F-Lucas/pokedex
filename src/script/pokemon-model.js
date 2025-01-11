class pokemonModel {
  name
  pokemonNumber
  types = []
  firstType = this.types[0]
  image
  constructor(name, pokemonNumber, types = [], image) {
    this.name = name
    this.pokemonNumber = pokemonNumber
    //
    this.types = types.map(typeItem => typeItem.type.name)
    this.firstType = this.types[0]
    this.image = image
  }
}
