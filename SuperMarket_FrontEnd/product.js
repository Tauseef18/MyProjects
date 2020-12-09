

// this will gives the url of the page
let pageUrl = location.href;

let id = pageUrl.split("?")[1].split("=")[1]; // splits the url based on ? then based on =

let dummyRating ="";
for(let i=1; i<=5; i++){
    dummyRating += `<i class="fa fa-star myrate notrated" style="font-size:20px;" aria-hidden="true"></i>`;
}

let ratingString = "";
for(let i=1; i<=5; i++){
    ratingString+= `<i class="fa fa-star" style="font-size:20px;color:gold" aria-hidden="true"> </i>`;
}


fetch("http://127.0.0.1:3000/product?id="+id)
.then((response)=>response.json())
.then((product)=>{
    // console.log(product);   

   


    let myRating = "";
    for(let i=0; i<=4; i++){
        myRating += `<i class="fa fa-star myrate notrated" onclick="submitRating(${product.id})" 
        onmouseover="makeRated(${i})" onmouseout="makeUnRated()" style="font-size:20px;" aria-hidden="true"></i>`;
    }
    
    

    // let ratingString = "";
    let averageRating = product.rating / product.rating_count;
    let widthPercentage = Math.round((averageRating / 5) * 100); 
    console.log(widthPercentage,averageRating);

        for(let i=1; i<=5; i++){

            // if(i<=Math.round(averageRating)){
                ratingString+= `<i class="fa fa-star" style="font-size:20px;color:gold" aria-hidden="true"> </i>`;
            // }
            // else{
            //     ratingString += `<i class="fa fa-star" style="font-size:20px;color:gray" aria-hidden="true"> </i>`;
            // }
        }

        document.getElementById('productTitle').innerText = product.title;
    let productString =     `

    <div class="card-body">
        <div class="card-title" style="font-size:90px;text-align:center">${product.emoji} ${product.emoji} ${product.emoji}</div>
    </div>
        
    <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
     </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Price : &#8377; ${product.price}</li>
        <li class="list-group-item" id="rating" style="height:50px;">
    
        <div id="productRating" style="width:93px;position:absolute;">

            <div class="dummystars" style="width:100%;position:absolute;">
            ${dummyRating}
            </div>

            <div class="dummystars" style="width:${widthPercentage}%;height:24px;position:absolute;white-space:nowrap;overflow:hidden">
            ${ratingString} 
            </div>

        </div>

        <div id="rating_count" style="position:absolute;left:120px;">
        ( ${product.rating_count} rating )  
        </div>
       
        
        </li> 
        <li class="list-group-item" id="myrating">${myRating} ( Rate Here ) </li> 
        <li class="list-group-item">Type : ${product.type}</li> 
    </ul>
    <div class="card-body">
        <a href="#" class="card-link btn btn-success">Buy Now</a>
    </div>`
 
  
    document.getElementById('product').innerHTML = productString;

});

function makeRated(index){

    var stars = document.getElementById('myrating').children;
 
    // console.log(stars);

    // for refresh everytime
    for(let i=0; i<stars.length; i++){

        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
    }

    for(let i=0; i<=index; i++){

        stars[i].classList.remove("notrated");
        stars[i].classList.add("rated");
    } 
}

function makeUnRated(){

    var stars = document.getElementById('myrating').children;

    for(let i=0; i<stars.length; i++){

        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
    }
}


function submitRating(id){

    let rating = document.getElementById('myrating').getElementsByClassName('rated').length;

    fetch("http://127.0.0.1:3000/updateRating?id="+id,{
        method: "PUT",
        body:JSON.stringify({rating:rating}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=>response.json())
    .then((product)=>{

            // let ratingString = "";

            let averageRating = product.rating / product.rating_count;
            let widthPercentage = Math.round((averageRating / 5) * 100); 

            document.getElementById('productRating').innerHTML = `

                <div class="dummystars" style="width:100%;position:absolute;">
                ${dummyRating}
                </div>

                <div class="dummystars" style="width:${widthPercentage}%;height:24px;position:absolute;white-space:nowrap;overflow:hidden">
                ${ratingString} 
                </div>
                `;

            document.getElementById('rating_count').innerHTML = `
            
              ( ${product.rating_count} rating ) `;



    
            // for(let i=1; i<=5; i++){
    
            //     if(i<=Math.round(averageRating)){
            //         ratingString+= `<i class="fa fa-star" style="font-size:20px;color:gold" aria-hidden="true"> </i>`;
            //     }
            //     else{
            //         ratingString += `<i class="fa fa-star" style="font-size:20px;color:gray" aria-hidden="true"> </i>`;
            //     }
            // }
            
            // document.getElementById('rating').innerHTML = `${ratingString} ( ${product.rating_count} rating )`; 

    })
    .catch((err)=>{
        console.log(err);
    })

}
























