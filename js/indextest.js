//page JS pour index.html 

//Définition d'une constante pour la requete Api
const URL = "http://localhost:3000/api/teddies/";

// requete GET avec method Fetch
let getDataFromApi = (objectList) => {
    let requestOptions = {
        method: 'GET', // utilisation de la methode GET
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

let createTeddies = (teddies) => {
    // selection d'un élément du DOM a modifier ultérieurement
    let teddiesList = document.querySelector ('.bloc2');
    let blocTitle = document.createElement ('h2');
    blocTitle.textContent = "Choisissez votre teddies";

    teddiesList.appendChild (blocTitle);
    
    // création d'une boucle FOR OF pour l'affichage en liste des teddies
    for (let teddy of teddies) { 
        
        // création des élément du DOM pour l'affichage des items
        let cardElt = document.createElement ('article');
        let contentElt = document.createElement ('div');
        let picElt = document.createElement ('img')
        let nameElt = document.createElement ('h3');
        let descriptionElt = document.createElement ('p');
        let btnElt = document.createElement ('a');
        
        // Récupération des donnée correspondantes à afficher dans les différents éléments du DOM
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
        
        // attribution de class au éléments du DOM nouvellement créés
        cardElt.classList.add ('card');
        picElt.classList.add ('card__pics');
        contentElt.classList.add ('card__content');
        btnElt.classList.add ('card__btn');

        btnElt.setAttribute('href', 'product.html?id=' + teddy._id);
    }
};

console.log(getDataFromApi(createTeddies));  

