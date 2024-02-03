'use strict'
const pokeApi  = {};

const convertPokeApiToPokemon = (pokemonDetail) => {
    const pokemon = new Pokemon;
    pokemon.name = pokemonDetail.name;
    pokemon.number = pokemonDetail.id;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.height = pokemonDetail.height;
    pokemon.weight = pokemonDetail.weight;  
    pokemon.abilities = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.specie = pokemonDetail.species.name;
    pokemon.status = pokemonDetail.stats.map((stat) => stat.stat.name);
    pokemon.vlStatus = pokemonDetail.stats.map((vlStat) => vlStat.base_stat)
    return pokemon;
}

const getPokemonsDetails = (pokemon) => {
    return (
        fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiToPokemon)

    )
} 

pokeApi.getPokemons = (offset = 2, limit = 15) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return (
        fetch(url)
            .then((response) => response.json())
            .then((responseBody) => responseBody.results)
            .then((results) => results.map(getPokemonsDetails))
            .then((pokemonDetails) => Promise.all(pokemonDetails))
            .then((pokemonDetail) => pokemonDetail)
    )
}

pokeApi.getPokemonsForDetails = (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return (
        fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiToPokemon)
            .then((details) => details)
    )
}