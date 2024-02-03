'use strict'
let idPokemon = null;

const geraNumero = (num) => {
    if(num <= 9){
        num = `#00${num}`;
    }else if(num <= 99){
        num = `#0${num}`
    }else if(num >= 100){
        num = `#${num}`;
    }
    return num;
}

const changePokemon = (action, id) =>{
    if(action == 'previous'){
        if(id > 1){window.location.href=`detail-pokemon.html?id=${id-1}`}
    }else if(action == 'next'){
        window.location.href=`detail-pokemon.html?id=${id+1}`
    }
}


const geraPokemon = () => {
    idPokemon = parseInt(new URLSearchParams(window.location.search).get("id"));
    
    pokeApi.getPokemonsForDetails(idPokemon).then((pokemon) => {
        let nome = document.getElementById('nome');
        nome.innerHTML += pokemon.name;

        let numeroHTML = document.getElementById('numero');

        numeroHTML.innerHTML = geraNumero(pokemon.number);

        let tipo = document.getElementById('tipos');
        tipo.innerHTML += pokemon.types.map((type) => `<span id="tipo" class="${type}">${type}</span>`).join('');

        
        
        let characterPokemon = document.getElementById('pokemon');

        characterPokemon.innerHTML += `
        <span class="material-symbols-outlined arrow" onclick="changePokemon('previous', ${idPokemon})">arrow_back_ios</span>
        <img src="${pokemon.photo}" alt="${pokemon.name}" id="pokemon-imagem">
        <span class="material-symbols-outlined arrow" onclick="changePokemon('next', ${idPokemon})">arrow_forward_ios</span>`;

        let infos = document.getElementById('infos');
        infos.classList.add(pokemon.type);

        let detalhes = infos.children[1];

        const informações = `
        <div id="peso">
            <span class="name">Peso</span>
            <span>${pokemon.weight/10} kg</span>
        </div>
        <div class="vertical-bar"></div>
        <div id="categoria">
            <span class="name">Categoria</span>
            <span>${pokemon.specie}</span>
        </div>
        <div class="vertical-bar"></div>
        <div id="altura">
            <span class="name">Altura</span>
            <span>${pokemon.height/10} m</span>
        </div>
        `;
        detalhes.innerHTML += informações;

        let pokemonHabilidades = document.getElementById('habilidades');
        let habilidades = pokemon.abilities.map((habilidade) => `<span>${habilidade}</span>`).join('-');
        pokemonHabilidades.innerHTML += habilidades;

        let vlProgressHP = document.getElementById('vlStatus');
        
        let i = 0;
        pokemon.vlStatus.forEach((sts) => { 
            if(sts > 100){pokemon.vlStatus[i] = 100;}
            i++;
        })


        let progress = `
            <div class="progress HP">
                <span>${pokemon.vlStatus[0]}</span>
                <progress class="progress-bar" value="${pokemon.vlStatus[0]}" max="100" id="barHP">
            </div>
            <div class="progress ATK">
                <span>${pokemon.vlStatus[1]}</span>
                <progress class="progress-bar" value="${pokemon.vlStatus[1]}" max="100" id="barHP"></progress>
            </div>
            <div class="progress DEF">
                <span>${pokemon.vlStatus[2]}</span> 
                <progress class="progress-bar" value="${pokemon.vlStatus[2]}" max="100" id="barHP"></progress>
            </div>
            <div class="progress SATK">
                <span>${pokemon.vlStatus[3]}</span>
                <progress class="progress-bar" value="${pokemon.vlStatus[3]}" max="100" id="barHP"></progress>
            </div>
            <div class="progress SDEF">
                <span>${pokemon.vlStatus[4]}</span>
                <progress class="progress-bar" value="${pokemon.vlStatus[4]}" max="100" id="barHP"></progress>
            </div>
            <div class="progress SPD">
                <span>${pokemon.vlStatus[5]}</span>
                <progress class="progress-bar" value="${pokemon.vlStatus[5]}" max="100" id="barHP"></progress>    
            </div>
            `;

        vlProgressHP.innerHTML += progress;
    })
}

geraPokemon();