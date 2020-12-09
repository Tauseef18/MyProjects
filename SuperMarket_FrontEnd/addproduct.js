
function createProduct(){

    let product = {};
 
    product.id = document.getElementById('id').value;
    product.title = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.price = document.getElementById('price').value;
    product.rating = document.getElementById('rating').value;
    product.type = document.getElementById('type').value;

   fetch("http://127.0.0.1:3000/product",{
       method: "POST",
       body: JSON.stringify(product),
       headers: {
           "Content-Type": "application/json"
       }
   }).then((response)=>response.json())
   .then((data)=>{

    document.getElementById('addform').reset();

    document.getElementById('message').innerHTML = `<p class="alert alert-success">${data.message} successfully !!</p>`;
       console.log(data);
   })


}

function validateId(){
    let id = document.getElementById('id').value;

    if(id==""){
        document.getElementById('idError').innerText = "Please provide the Id for the product !!";
        return false;
    }

    if(id < 0){
        document.getElementById('idError').innerText = "Id should be a positive number";
        return false;
    }
    document.getElementById('idError').innerText = "";
    return true;
}

function validateName(){

    let name = document.getElementById("name").value;

    if(name==""){
        document.getElementById("nameError").innerText="Name should not be empty";
        return false;
    }

    if(!(/^([a-zA-Z]+)$/).test(name)){
        console.log("hello");
        document.getElementById("nameError").innerText="Name should not have a number & it should have a space";
        document.getElementById("name").focus();
        return false;
    }
    document.getElementById("nameError").innerText="";
    return true;
}

function validateDescription(){

    let description = document.getElementById("description").value;

    if(description==""){
        document.getElementById("descriptionError").innerText="Description should not be empty";
        return false;
    }

    if(!(/^([a-zA-Z ]+)$/).test(description)){
        console.log("hello");
        document.getElementById("descriptionError").innerText="Description should not have a number & it should have a space";
        document.getElementById("description").focus();
        return false;
    }
    document.getElementById("descriptionError").innerText="";
    return true;
}


function validatePrice(){

    let price = document.getElementById("price").value;

    if(price==""){
        document.getElementById("priceError").innerText="Product's Price cannot be empty !!";
        return false;
    }

    if(price < 0){
        document.getElementById("priceError").innerText="Price should not be negative";
        document.getElementById("price").focus();
        return false;
    }
    document.getElementById("priceError").innerText="";
    return true;
}

function validateRating(){

    let rating = document.getElementById("rating").value;

    if(rating==""){
        document.getElementById("ratingError").innerText="Product's Rating cannot be empty !!";
        return false;
    }

    if(rating < 0){
        document.getElementById("ratingError").innerText="Rating should not be negative";
        document.getElementById("rating").focus();
        return false;
    }

    if(rating > 5){
        document.getElementById("ratingError").innerText="Rating should not be greater than 5";
        document.getElementById("rating").focus();
        return false;
    }

    document.getElementById("ratingError").innerText="";
    return true;
}

function validateType(){

    let type = document.getElementById("type").value;

    if(type==""){
        document.getElementById("typeError").innerText="Type should not be empty";
        return false;
    }

    if(!(/^([a-zA-Z]+)$/).test(type)){
        console.log("hello");
        document.getElementById("typeError").innerText="Type should not have a number & it should have a space";
        document.getElementById("type").focus();
        return false;
    }
    document.getElementById("typeError").innerText="";
    return true;
}

let errorCount = 0;
function validateForm(){


    if(validateId()==false){
        errorCount++;
    }

    if(validateName()==false){
        errorCount++;
    }

    if(validateDescription()==false){
        errorCount++;
    }

    if(validatePrice()==false){
        errorCount++;
    }

    if(validateRating()==false){
        errorCount++;
    }

    if(validateType()==false){
        errorCount++;
    }

    if(errorCount == 0){
        createProduct();
     
    }

    errorCount = 0;
}