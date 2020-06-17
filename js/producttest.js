// création du panier
let cartInit = [];
localStorage.setItem('userCart', JSON.stringify(cartInit));

// L'utilisateur a maintenant un panier
let userCart = JSON.parse(localStorage.getItem("userCart"));

//definition d'une constante pour selection un produit par son ID
const URLParams = new URLSearchParams(window.location.search);

let objectId = URLParams.get('id');

//requete pour le chargement de l'objet correspondant
const URL = "http://localhost:3000/api/teddies/" + objectId;


// requete GET
    let getDataFromApi = (objectList) => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };  
        fetch(URL, requestOptions)
        .then(response => response.json())
        .then(value => objectList(value))
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

let myTeddy = (oneTeddy) => {

    let teddyBlocElt = document.querySelector('.bloc2__item') ;

    let nameElt = document.createElement('h3');
    let picElt = document.createElement('img')        
    let descriptionElt = document.createElement('p');    
    let priceElt = document.createElement('p');
    
        

    teddyBlocElt.appendChild(nameElt);
    teddyBlocElt.appendChild(picElt);
    teddyBlocElt.appendChild(descriptionElt);
    teddyBlocElt.appendChild(priceElt);
    

    priceElt.classList.add ('bloc2__item--price');

    
    nameElt.textContent = (oneTeddy.name);
    picElt.src = oneTeddy.imageUrl ;
    descriptionElt.textContent = (oneTeddy.description);
    priceElt.textContent = ("Prix:" + " " + oneTeddy.price/100 + " " + "€");
     

    let colorsOption = oneTeddy.colors;

    colorsOption.forEach((colors) => {
        let colorChoice = document.createElement('option')
        document.getElementById("options").appendChild(colorChoice).innerHTML = colors;
    });

};

getDataFromApi(myTeddy);
