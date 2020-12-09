// to fetch all products

fetch("http://127.0.0.1:3000/products")
.then((response)=>response.json())
.then((products)=>{

    let productsString = "";

    products.forEach((product,index)=>{

        // let ratingString = "";
        // for(let i=1; i<=5; i++){

        //     if(i<=product.rating){
        //         ratingString += `<img src="images/yellowstar.png" width="25px"/>`;
        //     }
        //     else{
        //         ratingString += `<img src="images/greystar.png" width="25px"/>` 
        //     }
        // } 

        productsString += 
        `<tr>
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.type}</td>
            <td>${product.rating}</td>
            <td>
                <button class="btn btn-success" onclick="updateDataReady(this,${product.id})">Update</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id},this)">Delete</button>
            </td>
        </tr>`
     });

     
document.getElementById('product container').innerHTML = productsString;

});



// let id = pageUrl.split("?")[1].split("=")[1]; // splits the url based on ? then based on =
function deleteProduct(id,ele){

    // console.log(ele.parentNode.parentNode);
    ele.parentNode.parentNode.style.display = "none";

    fetch("http://127.0.0.1:3000/product?id="+id,{
        method: "DELETE"
    })
    .then((response)=>response.json())
    .then((data)=>{
        document.getElementById('message').innerHTML = `<p class="alert alert-success">${data.message}</p>`;
    })   


}

let childrens;

function updateDataReady(ele,id){

    // displaying the modal
    document.getElementById('parent_popup').style.display="block";


    // getting the data ready
    childrens = ele.parentNode.parentNode.children;
    // console.log(childrens[1].innerText);
    document.getElementById('id').value = id;

    document.getElementById('name').value = childrens[1].innerText;
    document.getElementById('description').value = childrens[2].innerText;
    document.getElementById('price').value = childrens[3].innerText;
    document.getElementById('type').value = childrens[4].innerText;

}

function updateProduct(){

    let product = {};
 
    let id = document.getElementById('id').value;
    product.title = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.price = document.getElementById('price').value;
    product.type = document.getElementById('type').value;

   fetch("http://127.0.0.1:3000/product?id="+id,{
       method: "PUT",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(product),

   }).then((response)=>response.json())
   .then((product)=>{

    document.getElementById('parent_popup').style.display = "none";
    console.log(product.title);

    // console.log(childrens);

    childrens[1].innerText = product.title;
    childrens[2].innerText =  product.description;
    childrens[3].innerText = product.price;
    childrens[4].innerText = product.type;

    document.getElementById('message').innerHTML =`<p class="alert alert-success">Product Updated Successfully!!</p>`;

   })

}

// event object carries all the properties and functions perform at the event
function closeModal(ev){

    if(ev.target.className == "parent_popup"){

    document.getElementById('parent_popup').style.display = "none";
    }

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

    if(validateName()==false){
        errorCount++;
    }

    if(validateDescription()==false){
        errorCount++;
    }

    if(validatePrice()==false){
        errorCount++;
    }


    if(validateType()==false){
        errorCount++;
    }

    if(errorCount == 0){
        updateProduct();
     
    }

    errorCount = 0;
}