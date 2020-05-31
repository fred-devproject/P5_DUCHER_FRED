/* module API */

let getDataFromApi = (callback) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };  
    fetch("http://localhost:3000/api/teddies/", requestOptions)
    .then(response => response.json())
    .then(result => callback(result))
    .catch(error => alert('erreur de chargement', error));
};

let createTeddies = (teddies) => {
    // selection d'un élément du DOM pour apporter des modification ultérieurement
    let teddiesList = document.querySelector ('.bloc2');
    // Récupération des la liste de produit au format JSON

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

        btnElt.setAttribute('href', 'product?id=' + teddy._id);
    }
};

getDataFromApi(createTeddies);            

