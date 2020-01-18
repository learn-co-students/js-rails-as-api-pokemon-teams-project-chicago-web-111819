const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function main(){
  document.addEventListener('DOMContentLoaded', function(){
    fetchTrainers()
    createClickListener()
  })
}

function createClickListener(){
  const main = document.querySelector('main')
  main.addEventListener('click', function(event){
    if(event.target.className === 'add') {
      postNewPokemon(event)
    } else if (event.target.className === 'release') {
      deletePokemon(event)
    }
  })
}

function deletePokemon(event){
  const pokeId = event.target.dataset.pokemonId
  const reqObj = { method: 'DELETE' }
  fetch(`${POKEMONS_URL}/${pokeId}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      event.target.parentNode.remove();
    })
}

function postNewPokemon(event){
  const trainerId = event.target.dataset.trainerId
  const reqObj = {
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ trainer_id: trainerId })
  }

  fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(pokeObj=> renderPostPokemon(event, pokeObj))
}

function renderPostPokemon(event, pokeObj){
  const ul = event.target.nextSibling
  renderPokemon(ul, pokeObj)
}

function fetchTrainers(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
      renderTrainers(trainers)
    })
}

function renderTrainers(trainers) {
  trainers.forEach(renderTrainer)
}

function renderTrainer(trainerObj) {
  const main = document.querySelector('main')
  const div =  document.createElement('div')
  div.className = 'card'
  div.dataset.id = trainerObj.id

  const p = document.createElement('p')
  p.innerText = trainerObj.name

  const button = document.createElement('button')
  button.innerText = 'Add Pokemon'
  button.className = 'add'
  button.dataset.trainerId= trainerObj.id

  const pokemonElements = renderPokemons(trainerObj)
  // create a ul node
  // create li nodes for each pokemon

  div.append(p, button, pokemonElements)
  main.append(div)
}

function renderPokemons(trainerObj){
  const ul = document.createElement('ul')
  trainerObj.pokemons.forEach(function(pokeObj){
    renderPokemon(ul, pokeObj)
  })
  return ul
}

function renderPokemon(ul, pokeObj){
    const li = document.createElement('li')
    li.innerText = `${pokeObj.nickname} (${pokeObj.species})`

    const button = document.createElement('button')
    button.innerText = 'release'
    button.className = 'release'
    button.dataset.pokemonId = pokeObj.id

    li.append(button)
    ul.append(li)
}

main()

