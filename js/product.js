
import {getDataFromApi} from './api.js';


let oneTeddy = document.querySelector('.bloc2') ;

let myTeddy = (teddies) => {

    

    for (oneTeddy of teddies){
        oneTeddy.appendChild (nameElt);
        oneTeddy.appendChild (picElt);
        oneTeddy.appendChild (descriptionElt);
        oneTeddy.appendChild (priceElt);

        let nameElt = document.createElement ('h3');
        let picElt = document.createElement ('img')        
        let descriptionElt = document.createElement ('p');    
        let priceElt = document.createElement ('p');   
            
                
        nameElt.textContent = oneTeddy.name;
        picElt.src = oneTeddy.imageUrl ;
        descriptionElt.textContent = oneTeddy.description;
        priceElt.textContent = oneTeddy.price;
    };
};  
     

getDataFromApi(myTeddy);





