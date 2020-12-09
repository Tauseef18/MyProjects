const http = require('http');

const fs = require('fs');       //to read the json file

const url = require('url');     // to parse the url so that we can read the parameters from it


// reading the file
const productsString = fs.readFileSync("./product.json","utf-8");
const products = JSON.parse(productsString);

 
const server = http.createServer((req,res)=>{

    // const path = req.url;               // gives the url from the page
    // console.log(path);
    // console.log(req.method);
    const path = url.parse(req.url,true);     //parse the url and gives all the details of the path query,pathname,etc..
    // console.log(path);                   // true value returns the query value in a object so to directly fetch the id

     // to send header from server to clients
    res.writeHead(200,{                           // this headers will be applicable to all 
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Content-Type":"application/json"
    });

    if(req.method == "OPTIONS"){
        res.end();
    }

    if(path.pathname=="/" || path.pathname=="/products"){

        res.end(productsString);  
    }

    else if(path.pathname =="/product"){

        if(req.method == "OPTIONS"){
            res.end();
        }
        else if(req.method == 'GET'){

        const id = path.query.id;    // to split query i.e id and its value to 1

        const singleData = products.find((ele)=>{         // find always return a single product(object) and use find
            return ele.id == id;                          //when u want to a single product
            
        })
        //  res.writeHead(200,{
        //     "Content-Type":"application/json"
        //  });
        res.end(JSON.stringify(singleData));  
        }

        else if(req.method == 'POST'){         

            let body = "";
            req.on("data",(data)=>{                 //keeping adding data unless all the chunks of data is recieved
                body +=  data;
             })

            req.on("end",()=>{              // once the req is complete
                let product = JSON.parse(body);       // convert json to javascript object
                products.push(product); 
                console.log(products);
                fs.writeFile("./product.json",JSON.stringify(products),(err)=>{
                    res.end(JSON.stringify({message:"product added"}));
                });
            });
        }

        else if(req.method == "PUT"){
            
            //product id
            const id = path.query.id;

            //product data
            let body = "";
            req.on("data",(data)=>{
                body +=  data;
            })

            req.on("end",()=>{              // once the req is complete
                let product = JSON.parse(body);

                products.forEach((ele)=>{
                    if(ele.id == id){

                        ele.title = product.title;
                        ele.description=product.description;
                        ele.price=product.price; 
                        ele.type=product.type;                   
                    }
                })

                // console.log(products);
                fs.writeFile("./product.json",JSON.stringify(products),(err)=>{

                    const updatedProduct = products.find((ele)=>{

                        return ele.id == id;
                    })

                    res.end(JSON.stringify(updatedProduct));
                });
            })
        }

        else if(req.method == 'DELETE'){

            //product id
            const id = path.query.id;

            products.forEach((ele,index)=>{
                if(ele.id == id){
                    products.splice(index,1);
                }
            })
            // console.log(products);
            fs.writeFile("./product.json",JSON.stringify(products),(err)=>{
                res.end(JSON.stringify({message:"product deleted"}));
            });
           
        }
            
    } 

    else if(path.pathname == "/updateRating"){

        if(req.method == "PUT"){
                //product id
              const id = path.query.id;

                //product data
                let body = "";
                req.on("data",(data)=>{
                body +=  data;
                })

                req.on("end",()=>{            // once the req is complete
                    let product = JSON.parse(body);

                    products.forEach((ele)=>{
                         if(ele.id == id){

                            ele.rating = Number(ele.rating) + Number(product.rating);
                            ele.rating_count = Number(ele.rating_count) + 1;
                       }
                    });
                               
            
                // console.log(products);
                    fs.writeFile("./product.json",JSON.stringify(products),(err)=>{

                    const updatedProduct = products.find((ele)=>{
                        return ele.id == id;
                    })

                    res.end(JSON.stringify(updatedProduct));
                });
            }); 
        }
    }

    else{
        // res.writeHead(404,{
        //     "Content-Type":"application/json"
        // }); 
            res.statusCode = 404;                
            res.end(JSON.stringify({message:"Not Found Anything for this URL"}));
    }

});

server.listen("3000","127.0.0.1",()=>{
    console.log("server started");
});







