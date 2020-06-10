const URLParams = new URLSearchParams(window.location.search);

let objectId = URLParams.get('id');

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
    .catch(error => console.log(error));
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
        descriptionElt.textContent = ("Description du produit:" + " " + oneTeddy.description);
        priceElt.textContent = ("Prix:" + " " + oneTeddy.price/100 + " " + "€"); 

        let colorsOption = oneTeddy.colors;

        colorsOption.forEach((colors) => {
            let colorChoice = document.createElement('option')
            document.getElementById("color-select").appendChild(colorChoice).innerHTML = colors;
        });
};


    
     

getDataFromApi(myTeddy);