const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const findBody = document.querySelector('body')

const divy = document.getElementsByClassName('card')

document.addEventListener("DOMContentLoaded", function() {
    fetchTrainers();
});

function fetchTrainers(){
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => addTrainers(json.trainers))
}

function addTrainers(array){
    // let array = jsonObj.trainers
    for (const obj of array){
        let divWithCard = document.createElement('div')
        divWithCard.classList.add('card')
        divWithCard.id = obj.id
        let newP = document.createElement('p')
        newP.innerText = obj.name
        let stringP = String(newP)
        divWithCard.appendChild(newP)
        findBody.appendChild(divWithCard)
    }
}