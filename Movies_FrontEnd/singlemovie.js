

let id = location.href.split("?")[1].split("=")[1];
console.log(id);


fetch("http://localhost:3000/api/v1/movies/"+id)
.then((reponse)=>reponse.json())
.then((movie)=>{

    let moviesString = "";
    let actorsString = "";

    let {actors,genre,poster,name,rating,year,revenue} = movie;

    actors.forEach((actor)=>{

        let {name,poster} = actor;

         actorsString += 

            `<div class="card" style="width: 150px;margin-left: 20px;margin-top:30px;background-color:black;color:#dedcdc">
                <img src="${poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                </div>
        </div>`

    })

    moviesString += `

       <div class="card" style="width: 100%;margin-top:30px;background-color:black;color:#dedcdc">
            <img src="${poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" style="background-color:black;color:#dedcdc">${rating}</li>
                <li class="list-group-item" style="background-color:black;color:#dedcdc">$ ${revenue}M</li>
                <li class="list-group-item" style="background-color:black;color:#dedcdc">${year}</li>
            </ul>
       </div>`

       document.getElementById('singleMovie').innerHTML = moviesString;
       document.getElementById('details').innerHTML = actorsString;
    
})