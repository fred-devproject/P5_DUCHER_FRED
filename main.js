// fichier index.js pour l'affichage dynamique des produits sur la page d'accueuil 


// Appel de l'API teddies pour le chargement des objets JSON
let requestApi = new XMLHttpRequest (); /* Création d'une constante requestApi */
    requestApi.onreadystatechange = function () { /* création d'une fonction qui verifie l'état de la requete */
    if (requestApi.readyState === XMLHttpRequest.DONE && requestApi.status === 200) { /* on verifie l'état DONE et le status 200 (succès) */
        const jsonObj = JSON.parse (requestApi.responseText);
        
        // selection d'un élément du DOM pour apporter des modification ultérieurement
        let teddiesList = document.querySelector ('.bloc2');
        // Récupération des la liste de produit au format JSON
        let itemTable = jsonObj ;


        for (let item of itemTable) {
            console.log(item);
          
            let cardElt = document.createElement ('article');
            let contentElt = document.createElement ('div');
            let picElt = document.createElement ('img')
            let nameElt = document.createElement ('h3');
            let descriptionElt = document.createElement ('p');
            

            picElt.src = item.imageUrl ;
            nameElt.textContent = item.name;
            descriptionElt.textContent = item.description;
            

            teddiesList.appendChild (cardElt);
            
            cardElt.appendChild (picElt);
            cardElt.appendChild (contentElt)
            contentElt.appendChild (nameElt);
            contentElt.appendChild (descriptionElt);
            

            cardElt.classList.add ('card');
            picElt.classList.add ('card__pics');
            contentElt.classList.add ('card__content');
            
        }

    }    
                       
};

requestApi.open ("GET","http://localhost:3000/api/teddies/");
requestApi.send ();


 



    
  




// Création d'un bloc HTML pour affichage des teddies en liste


