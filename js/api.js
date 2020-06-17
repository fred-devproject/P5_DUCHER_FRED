// creation d'un module pour les requetes API 
const URLParams = new URLSearchParams(window.location.search);

let objectId = URLParams.get('id');

//requete pour le chargement de la liste complete d'objet
const URL = "http://localhost:3000/api/teddies/" + objectId;
// requete GET
let getDataFromApi = (objectList) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };  
    fetch(URL, requestOptions)
    .then(response => response.json())
    .then(result => objectList(result))
    .catch(error => {
        // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
        let apiFail = document.querySelector('.bloc2');
        let failMessage = document.createElement ('p');
        failMessage.innerText = "Erreur de chargement de la page";
        failMessage.classList.add("bloc2__item")
        apiFail.appendChild(failMessage);
        console.log(error);
    });
};
/*
// requete pour le chargement d'un objet en fonction de son ID
let objectId = window.location.search.substring(1);
const URLOBJECT = "http://localhost:3000/api/teddies/" + objectId ; 

//import du module de requete pour recuperer les données 
export let getOneDataFromApi = (callback) => {
    let requestOptions = {
        method: 'GET',
    };  
    fetch(URLOBJECT, requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => alert('erreur de chargement', error));
};

// requete POST
*/

export {get};