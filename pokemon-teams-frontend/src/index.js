const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener('DOMContentLoaded', (e) => {
    getTrainers()
});

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => renderTrainers(trainers));
}

/** TODO: Make this work along with 'renderPokemons() */
function getPokemons() {
    let pokeArray = [];
    fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(pokemons => console.log(pokemons));
}

function renderPokemons(trainer_id){
  // Add your crap here...
}

function renderTrainers(trainers){
    const mainContainer = document.querySelector('main');
    trainers.map((trainer) => {
    const divCard = document.createElement('div');
    divCard.className = "card";
    divCard.setAttribute('data-id', trainer.id);
    const p = document.createElement('p');
    const addPokeBtn = document.createElement('button');
    addPokeBtn.setAttribute('data-trainer-id', trainer.id);
    const pokeUl = document.createElement('ul');
    p.innerText = `${trainer.name}`;
    addPokeBtn.innerText = 'Add Pokemon';
    divCard.appendChild(p);
    divCard.appendChild(addPokeBtn);
    trainer.pokemons.map((pokemon) => {
        const pokeLi = document.createElement('li');
        pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
        pokeUl.appendChild(pokeLi);
    })
    divCard.appendChild(pokeUl);
    mainContainer.appendChild(divCard);
    });
}