//MAIN JS


//Définition d'une constante pour l'url de la requête GET Api
const URL = "http://localhost:3000/api/teddies/";
// initialisation d'une variable idParams qui sera utilisé pour compléter l'url produit et comme "key" pour le stockage dans le session.storage
let idParams;

//creation d'une condition pour attribuer une valeur à la variable "idParams"
const URLParams = new URLSearchParams(window.location.search);
let objectId = URLParams.get('id');
if(objectId === null){
    idParams = "";
}else {
    idParams = objectId;
}


// promise pour la requete API avec méthode Fetch
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
            apiFail = document.querySelector('.bloc2');
            apiFail.classList.add('fail__msg');
            apiFail.innerHTML = "Oups! Erreur de chargement de la page";
            console.error(error);
        });
	});
};


/* index page
==============*/

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

/* product page
================*/
// verification de l'existence d'un panier utilisateur dans le local.storage sinon création d'un nouveau panier
if(localStorage.getItem("userCart")){
	console.log("Panier utilisateur existant dans le local storage");
}else{
	console.log("Création d'un panier utilisateur dans le local storage");
  	//Le panier est un tableau de produits
  	let cartInit = [];
  	localStorage.setItem("userCart", JSON.stringify(cartInit));
};
let userCart = JSON.parse(localStorage.getItem("userCart"));

// fonction pour l'affichage du produit selectionné sur la page product.html
async function objectSelected(){
    let oneTeddy = await getApiData();

    /* Création d'un item dans session.storage au chargement de la page pour conserver l'ID et les keys / value des produits consultés 
    afin d'eviter un second appel de l'API lors du push dans le local.storage */
    let teddyInCache_json = JSON.stringify(oneTeddy);
    sessionStorage.setItem(oneTeddy._id, teddyInCache_json);

    // selection d'un élément du DOM pour l'affichage du produit selectionné
    let teddyBlocElt = document.querySelector('.bloc2__item') ;

    // creation des éléments du DOM necessaire a l'affichage du produit
    let nameElt = document.createElement('h3');
    let picElt = document.createElement('img') ;       
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
        colorChoice.setAttribute
        document.getElementById("options").appendChild(colorChoice).innerHTML = colors;
    });    
};
  
//Fonction ajouter le produit au panier de l'utilisateur 
addtoStorage = ()=>{
    //Ecouter l'événement clic pour mettre le produit dans le local.storage
    let getInCart = document.getElementById("addtocart__btn");
                
    getInCart.addEventListener("click", async function() {
        let teddyInCache_json = sessionStorage.getItem(idParams);
        let teddyInCache = JSON.parse(teddyInCache_json);

        let teddyId = teddyInCache._id;
        let teddyName = teddyInCache.name;
        let teddyPrice = teddyInCache.price;
         
        // Recuperation des options des blocs select pour la quantité et la couleur
        let selectQuantity = document.getElementById("productQuantity");
        // transformation en type number de la valeur recuperé en type string 
        let teddyQuantity = parseInt(selectQuantity.options[selectQuantity.selectedIndex].value);
        let selectColor = document.getElementById("options");
        let teddyColor = selectColor.options[selectColor.selectedIndex].text;
        let teddySubTotal = teddyQuantity*teddyPrice;
        
        //Récupération du panier dans le localStorage et ajout du produit dans le panier avant renvoi dans le localStorage
        userCart.push({teddyId, teddyName, teddyPrice, teddyQuantity, teddyColor, teddySubTotal});
        localStorage.setItem("userCart", JSON.stringify(userCart));

        // message à l'utilisateur pour lui indiquer l'ajout de son produit dans le panier
        let validationMessage = document.getElementById("validate__msg");
        validationMessage.textContent = ("Produit ajouté au panier");
        function hideMessage(){
            document.getElementById("validate__msg").innerHTML="";
            }
            window.setTimeout(hideMessage, 2000);
    });
};

/* cart page
=============*/

loadCartPage = ()=>{

    let cartToDisplay = JSON.parse(localStorage.getItem("userCart"));
    console.log(cartToDisplay);

    //Selection de l'élément du DOM ou s'affichera l'état du panier 
    const displayCart = document.getElementById("bloc2__title");
    displayCartTitle = document.createElement("h2");
    displayCart.append(displayCartTitle);

    const cartBloc = document.getElementById('cart__bloc');

    // verification de l'existence de produits dans le local.storage
    if(cartToDisplay.length === 0){
        displayCartTitle.textContent ="Votre panier est actuellement vide";
        removeCart = document.getElementById("bloc2__cart");
        removeCart.remove();
    } else {
        displayCartTitle.textContent ="Contenu de votre panier";


        /* Une boucle pour l'affichage des produit dans le tableau du panier */
        for (let i = 0; i < cartToDisplay.length; i++) {
            const itemInCart = cartToDisplay[i];

            const itemName = itemInCart.teddyName;
            const itemQuantity = itemInCart.teddyQuantity;
            const itemColor = itemInCart.teddyColor;
            const itemPrice = ((itemInCart.teddySubTotal / 100)+"€");
                       
            let row = cartBloc.insertRow(-1);

            let nameCell = row.insertCell(0);
            nameCell.innerText = itemName;

            let colorCell = row.insertCell(1);
            colorCell.innerText = itemColor

            /* bouton ajout */
            let quantityCell = row.insertCell(2);
            quantityCell.setAttribute('id', 'quantity_cell');
            const addItem =document.createElement('button');
            addItem.setAttribute('id', 'add_button')
            addItem.textContent =('+')

            /* fonction pour ajouter un objet au panier */
            addItem.addEventListener('click', ()=>{
                if(itemQuantity < 9){
                    itemInCart.teddyQuantity ++;
                    itemInCart.teddySubTotal = itemInCart.teddyQuantity*itemInCart.teddyPrice;
                    localStorage.setItem('userCart', JSON.stringify(cartToDisplay));
                    window.location.reload();
                }
            });

            /* bouton soustraire */
            const substractItem =document.createElement('button');
            substractItem.setAttribute('id', 'substract_button')
            substractItem.textContent =('-')
            quantityCell.append(substractItem, itemQuantity, addItem);

            /* fonction pour soustraire un objet du panier */
            substractItem.addEventListener('click', ()=>{
                if(itemQuantity >= 2){
                    itemInCart.teddyQuantity --;
                    itemInCart.teddySubTotal = itemInCart.teddyQuantity*itemInCart.teddyPrice;
                    localStorage.setItem('userCart', JSON.stringify(cartToDisplay));
                    window.location.reload();
                }
            });
            
            /* bouton supprimer */
            let deleteCell = row.insertCell(3);
            const deleteItem = document.createElement('button');            
            deleteItem.setAttribute('id', 'delete_button');            
            deleteItem.textContent = ('x');
            deleteCell.append(deleteItem); 

            /* fonction pour supprimer un objet du panier */
            deleteItem.addEventListener('click', ()=>{
                localStorage.removeItem[i];
                cartToDisplay.splice(i, 1); 
                localStorage.setItem('userCart', JSON.stringify(cartToDisplay));
                window.location.reload();    
            });

            let priceCell = row.insertCell(4);
            priceCell.innerText = itemPrice;

            // afficher le montant total du panier
            let totalPrice = 0;
            cartToDisplay.forEach((itemInCart)=>{
      	    totalPrice += itemInCart.teddySubTotal / 100;
            });
            console.log(totalPrice);
            document.getElementById('total_cart').textContent = totalPrice + "€";

            //Apparition du formulaire utilisateur au clic sur le bouton passer commande 
            const openOrder = document.getElementById('order__btn');
            openOrder.addEventListener('click', ()=>{
                document.getElementById('bloc2__order').style.display='block';
            });
            

        }

    }
};

sendOrder = ()=>{

    // Récupération du panier et des données de contact utilisateur pour l'envoi de la commande
    let cartToSend = JSON.parse(localStorage.getItem("userCart"));
    let checkForm = document.getElementById('contactbloc');
    const clickToSend = document.getElementById('validorder__btn');

    clickToSend.addEventListener('click',($event)=>{

        $event.preventDefault();
        document.getElementById('bloc2__order').style.display='block';
        let lastName = document.getElementById('lastname').value;
        let firstName = document.getElementById('firstname').value;
        let email = document.getElementById('email').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;

        // création de l'objet contact 
        let contact = {lastName, firstName, email, address, city};

        // création du tableau product
        const products = [];
        cartToSend.forEach(item =>{
            products.push(item.teddyId)
        });

        //requete POST avec methode Fetch
        const order = "order";
        const request = new Request((URL + order), {
            method: 'POST',
            body: JSON.stringify({contact, products}),
            // Pour valider la requête on a besoin d'un objet JSON contenant "contact" && "products"
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
        .then(response => response.json())
        .then(response=>{
            if (checkForm.checkValidity() === true){
                let getOrderId = response.orderId;
                let getTotalPrice = document.getElementById('total_cart').textContent;
                localStorage.clear;
                let validOrder = {getOrderId, getTotalPrice};
                sessionStorage.setItem("confirmOrder", JSON.stringify(validOrder));
                console.log(validOrder);
            }
        })
        .catch(error=>{
            // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
            apiPostFail = document.querySelector('.bloc2');
            apiPostFail.classList.add('fail__msg');
            apiPostFail.innerHTML = "Oups! Une erreur c'est produite lors du passage de votre commande veuillez réessayer";
            console.error(error);
        });
        
    });
};

                       
   
        
