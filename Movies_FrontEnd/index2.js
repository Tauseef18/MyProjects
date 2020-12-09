
// displaying function for all the movies
function displayMovies(movies){


    if(movies.length != 0){

        let moviesString = "";

        movies.forEach((movie,index)=>{

        let {poster,name,rating,year,revenue} = movie;

             moviesString += `
        
                <div class="card" style="width: 18rem;margin-left:70px;margin-top:30px;background-color:black;color:#dedcdc">
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

        })

             document.getElementById('movies').innerHTML = moviesString;

    }
    else{

        document.getElementById('movies').innerHTML = `<h2 style="margin-top:30px;color:white">No Movies Found</h2>`;

     }
    
}



// fetching movie data from the back end
let allMovies;

fetch("http://localhost:3000/api/v1/movies")
.then((res)=>res.json())
.then((movies)=>{
  
    allMovies = movies;

    displayMovies(allMovies);     // calling the display function

})
.catch((err)=>{console.log(err)});



function filterByName(moviesData,movieName){

    let movies = moviesData.filter((ele)=>{
        return ele.name.toLowerCase().includes(movieName.toLowerCase());
    })
   
    return movies;
   
}

// to change the text on it when we drag it
function changeTextOnFilter(rating,id){
    document.getElementById(id).innerText = rating;
}


function filterByRating(moviesData,minRating,maxRating){

    if(Number(maxRating) < Number(minRating)){
        maxRating = minRating;
        document.getElementById('maxR').innerText = maxRating;
        document.getElementById('max-rating').value = maxRating;
    }

    let movies = moviesData.filter((ele)=>{
        return ele.rating >= minRating && ele.rating <= maxRating;
    })

    return movies;
}



function filterByUniverse(moviesData,universe){

        let movies = moviesData.filter((ele)=>{
            return ele.universe == universe;
        });

        return movies;
   
}


function applyFilters(){

    let movies = allMovies;

    let movieName = document.getElementById('name').value;
    let universe = document.getElementById('universe').value;

    let minRating = document.getElementById('min-rating').value;
    let maxRating = document.getElementById('max-rating').value;

    if(movieName != ""){
        movies = filterByName(movies,movieName);

    }

    if(universe != ""){
        movies = filterByUniverse(movies,universe);
    }

    movies = filterByRating(movies,minRating,maxRating);
    
    displayMovies(movies);



}



function sortMovies(property,what){

    let movies;

    if(what == "asc"){
        movies = moviesData.sort((a,b)=>{
            return a[property] - b[property];           // a['rating'] is same as a.rating (use for dynamic keys)
        })
    }
    
    else{
        movies = moviesData.sort((a,b)=>{
            return b[property] - a[property];                          // a['rating'] is same as a.rating
        })
    }

    displayMovies(movies);

}


let genre = [];
function filterByGenre(currBtn){

    let buttons = document.getElementsByClassName('genre');     // to get all the buttons

    // console.log(buttons);
    // console.log(currBtn);

        if(currBtn.value != "all"){

            if(currBtn.classList["value"].indexOf("btn-primary")>=0){

                currBtn.classList.remove("btn-primary");
                currBtn.classList.add("btn-dark");

                let removeIndex = genre.indexOf(currBtn.value);
                genre.splice(removeIndex,1);

                if(genre.length == 0){
                    buttons[0].classList.remove("btn-dark");
                    buttons[0].classList.add("btn-primary");
                }

            }else{

                genre.push(currBtn.value);

                buttons[0].classList.remove("btn-primary");
                buttons[0].classList.add("btn-dark");
    
                currBtn.classList.remove("btn-dark");
                currBtn.classList.add("btn-primary");

            }
        }

        else if(currBtn.value == "all"){

            genre = [];

            currBtn.classList.remove("btn-dark");
            currBtn.classList.add("btn-primary");

            for(let i=1; i<buttons.length; i++){
                buttons[i].classList.remove("btn-primary");
                buttons[i].classList.add("btn-dark")
            }
        }

        if(genre.length != 0){

            let movies = moviesData.filter((ele)=>{
                return checkArrays(ele.genre,genre);
            });
            displayMovies(movies);
        }
        else{
            displayMovies(moviesData);
        }

        
}


function checkArrays(arr1, arr2){

    let counter = 0;
    arr2.forEach((ele)=>{
        if(arr1.includes(ele)){
            counter++;
            return;
        }
    });

    if(counter > 0){
        return true;
    }
    else{
        return false;
    }

}
























