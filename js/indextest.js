//import du module de requete pour recuperer les données 
// creation d'un module pour les requetes API 
let objectId = window.location.search.substring(1);

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
    .catch(error => alert('erreur de chargement', error));
};


let createTeddies = (teddies) => {
    // selection d'un élément du DOM a modifier ultérieurement
    let teddiesList = document.querySelector ('.bloc2');
    
    // création d'un item teddy par objet du tableau Json et manipulation du DOM pour affichage des ours
    for (let teddy of teddies) {          
        let cardElt = document.createElement ('article');
        let contentElt = document.createElement ('div');
        let picElt = document.createElement ('img')
        let nameElt = document.createElement ('h3');
        let descriptionElt = document.createElement ('p');
        let btnElt = document.createElement ('a');
        
        picElt.src = teddy.imageUrl ;
        nameElt.textContent = teddy.name;
        descriptionElt.textContent = teddy.description;
        btnElt.textContent = "faisons connaissance";
        
        
        teddiesList.appendChild (cardElt);            
        cardElt.appendChild (picElt);
        cardElt.appendChild (contentElt)
        contentElt.appendChild (nameElt);
        contentElt.appendChild (descriptionElt);
        contentElt.appendChild (btnElt);
        

        cardElt.classList.add ('card');
        picElt.classList.add ('card__pics');
        contentElt.classList.add ('card__content');
        btnElt.classList.add ('card__btn');

        btnElt.setAttribute('href', 'product.html?id=' + teddy._id);
    }
};

getDataFromApi(createTeddies);  
