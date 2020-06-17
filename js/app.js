//MAIN JS
/*
- Appel API / getApiData                                                     ==> line: 19
- Affichage en liste sur la page index.html / objectList                     ==> line: 42
- Affichage de l'objet selectionné sur la page product.html / objectSelected ==> line: 89
- Verification et création du panier utilisateur                             ==> line: 135
- Ajout d'un produit dans le panier utilisateur / addToCart                  ==> line: 145
*/

//Définition d'une constante pour la requete Api
const URL = "http://localhost:3000/api/teddies/";
let idParams;

//creation d'une condition pour attribuer une valeur à la variable "idParams"
const URLParams = new URLSearchParams(window.location.search);
let objectId = URLParams.get('id');
if(objectId === null){
    idParams = "";
}else {
    idParams = objectId;
}

// promise pour la requete API avec méthode fetch
getApiData = () =>{
	return new Promise((objectList) =>{
		let requestOptions = {
            method: 'GET', // utilisation de la methode GET
            redirect: 'follow'
        };  
        fetch((URL + idParams) , requestOptions)
        .then(response => response.json())
        .then(result => objectList(result))
        .catch(error => {
            // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
            let apiFail = document.querySelector('.bloc2');
            let failMessage = document.createElement ('p');
            failMessage.innerText = "Erreur de chargement de la page";
            failMessage.classList.add("bloc2__item")
            apiFail.appendChild(failMessage);
            console.error(error);
        });
	});
};

//fonction pour l'affichage des produits en liste sur la page index.html
async function objectsList(){
    let teddies = await getApiData();
    console.log(teddies);
    
    // selection d'un élément du DOM a modifier ultérieurement
    let teddiesList = document.querySelector ('.bloc2');
    let blocTitle = document.createElement ('h2');
    blocTitle.textContent = "Choisissez votre teddies";

    teddiesList.appendChild (blocTitle);
    
    // création d'une boucle FOR OF pour l'affichage en liste des objets
    for (let teddy of teddies){
        
        // création des éléments du DOM pour l'affichage des items
        let cardElt = document.createElement ('article');
        let contentElt = document.createElement ('div');
        let picElt = document.createElement ('img')
        let nameElt = document.createElement ('h3');
        let descriptionElt = document.createElement ('p');
        let btnElt = document.createElement ('a');
        
        // Récupération des données correspondantes à afficher dans les différents éléments du DOM
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
    };
};

// fonction pour l'affichage du produit selectionné sur la page product.html
async function objectSelected(){
    let oneTeddy = await getApiData();

    //Création d'un session storage pour conserver l'ID de l'item affiché
    let teddyInCache = oneTeddy;
    let teddyInCache_json = JSON.stringify(teddyInCache);
    sessionStorage.setItem(oneTeddy._id, teddyInCache_json);

    // selection d'un élément du DOM pour l'affichage du produit selectionné
    let teddyBlocElt = document.querySelector('.bloc2__item') ;

    // creation des éléments du DOM necessaire a l'affichage du produit
    let nameElt = document.createElement('h3');
    let picElt = document.createElement('img')        
    let descriptionElt = document.createElement('p');    
    let priceElt = document.createElement('p');
    
    teddyBlocElt.appendChild(nameElt);
    teddyBlocElt.appendChild(picElt);
    teddyBlocElt.appendChild(descriptionElt);
    teddyBlocElt.appendChild(priceElt);
    
    // ajout d'une class au bloc price 
    priceElt.classList.add ('bloc2__item--price');

    // recuperation des valeur necessaire à l'affichage dans les élément créés
    nameElt.textContent = (oneTeddy.name);
    picElt.src = oneTeddy.imageUrl ;
    descriptionElt.textContent = (oneTeddy.description);
    priceElt.textContent = ("Prix:" + " " + oneTeddy.price/100 + " " + "€");
        
    // création du menu déroulant pour la selection des options du produit
    let colorsOption = oneTeddy.colors;

    colorsOption.forEach((colors) => {
        let colorChoice = document.createElement('option')
        document.getElementById("options").appendChild(colorChoice).innerHTML = colors;
    });
    
};

// verification de l'existence d'un panier utilisateur dans le local.storage sinon création d'un nouveau panier
if(localStorage.getItem("userCart")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
  	//Le panier est un tableau de produits
  	let cartInit = [];
  	localStorage.setItem("userCart", JSON.stringify(cartInit));
  };
let userCart = JSON.parse(localStorage.getItem("userCart"));
  
//Fonction ajouter le produit au panier de l'utilisateur 
addtocart = () =>{
    //Ecouter l'événement clic pour mettre le produit dans le panier
    let getInCart = document.getElementById("addtocart__btn");
    getInCart.addEventListener("click", async function() {
        
        let teddyInCache_json = sessionStorage.getItem(idParams);
        let teddyInCache = JSON.parse(teddyInCache_json);
        //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
        userCart.push(teddyInCache);
        localStorage.setItem("userCart", JSON.stringify(userCart));
    });
};