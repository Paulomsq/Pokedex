'use strict'
const olPokemon = document.getElementById('listaPokemons');
const buttonLoad = document.getElementById('loadMore');
const limit = 12;
let offset = 0;
let max = 151;

const paginaPokemon = (id) => {
    window.location.href=`detail-pokemon.html?id=${id}`
}

const verificaTamanhoTela = (id) =>{
    if(window.innerWidth >= 600){
        return console.log('tela pequena');1
    }else{
        return paginaPokemon(id);
    }
}

// https://pokeapi.co/api/v2/pokemon/

const loadPokemons = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((listaPokemon = []) => {
        const newHTML = listaPokemon.map((pokemon) => `
        <div class="" onclick="verificaTamanhoTela(${pokemon.number})">
            <li class="pokemon ${pokemon.type}">
                <span class="numero">#${pokemon.number}</span>
                <span class="nome">${pokemon.name}</span>
                <div class="detalhes">
                    <ol class="tipos">
                        ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div> 
            </li>
        </div>
        `).join('');
        olPokemon.innerHTML += newHTML;
        
    })
        .catch((erro) => console.log(erro, "Erro na API"));
}

loadPokemons(offset, limit);

buttonLoad.addEventListener('click', () => {
    offset+= limit;
    const qtdNextPage = offset + limit;
    if(qtdNextPage >= max){
        const newLimit = max - offset;
        loadPokemons(offset, newLimit);
        buttonLoad.parentElement.removeChild(buttonLoad);
    }else{
        loadPokemons(offset, limit);
    }

})
