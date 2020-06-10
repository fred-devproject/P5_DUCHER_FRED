// creation d'un module pour les requetes API 
let objectId = window.location.search.substring(1);

//requete pour le chargement de la liste complete d'objet
const URL = "http://localhost:3000/api/teddies/" + objectId;
// requete GET
export let getDataFromApi = (objectList) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };  
    fetch(URL, requestOptions)
    .then(response => response.json())
    .then(result => objectList(result))
    .catch(error => alert('erreur de chargement', error));
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