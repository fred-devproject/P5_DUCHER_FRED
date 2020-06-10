//création d'une requete fetch pour récuperer les données de l'api
import {getDataFromApi} from './api.js';


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

        btnElt.setAttribute('href', 'product.html?' + teddy._id);
    }
};

getDataFromApi(createTeddies);  





