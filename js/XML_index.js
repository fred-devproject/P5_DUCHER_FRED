// fichier index.js pour l'affichage dynamique des produits sur la page d'accueuil 


// Appel de l'API teddies pour le chargement des objets JSON
let getDataFromApi = (method, url, callback) => {
    let request = new XMLHttpRequest (); /* Création d'une constante requestApi */
        request.open (method,url);
        request.onreadystatechange = function () { /* création d'une fonction qui verifie l'état de la requete */
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) { /* on verifie l'état DONE et le status 200 (succès) */
                callback(JSON.parse(request.responseText));
                //createTeddies(JSON.parse(request.responseText);
            }
        }
    request.send ();
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

getDataFromApi("GET","http://localhost:3000/api/teddies/", createTeddies);
