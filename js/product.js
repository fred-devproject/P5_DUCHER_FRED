// fichier index.js pour l'affichage dynamique des produits sur la page d'accueuil 


// selection d'un élément du DOM pour apporter des modification ultérieurement


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


getDataFromApi("GET","http://localhost:3000/api/teddies/", createTeddies);

