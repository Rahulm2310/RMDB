$("#submitbtn").on("click", function(e) {
  var searchText = $("#searchText").val();
  getMovies(searchText);

  e.preventDefault();
});

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "rmdb.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  $.get("https://www.omdbapi.com?apikey=9b48ef39&i=" + movieId)
    .then(function(response) {
      console.log(response);
      let movie = response;
      let output = `
            <div class="row">
                <div class="movie-details-image col-md-4 col-sm-12">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>

                <div class="col-md-8 col-sm-12">
                    <h2 class="movie-name">${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre} </li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released} </li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated} </li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating} </li>
                        <li class="list-group-item"><strong>Director :</strong> ${movie.Director} </li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer} </li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors} </li>

                   </ul>
                </div>
                
            </div>

            <div class="row">
                <div class="well plot-container">
                    <h3>Plot</h3>
                    <p class="movie-plot">${movie.Plot}</p>
                    <hr>
                    <div class="movie-container-btns">
                      <a href="http://imdb.com/title/${movie.imdbID}" target="_blank"  class="btn btn-success btn-md">View IMDB</a>
                      <a href="index.html" class="btn bnt-default">Back to Search</a>
                    </div>
                </div>
            </div>
                
                
                
                `;

      $("#movie").html(output);
    })

    .catch(function(err) {
      console.log(err);
    });
}

function getMovies(searchText) {
  $.get("https://www.omdbapi.com?apikey=9b48ef39&s=" + searchText)
    .then(function(response) {
      console.log(response);

      let movies = response.Search;
      let output = "";
      $.each(movies, function(index, movie) {
        output += `
                            <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div class="well text-center">
                                    <img src="${movie.Poster}"> 
                                    <h5>${movie.Title}</h5>
                                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                    </div>
                                    </div>
                                    `;
      });
      $("#movies").html(output);
    })

    .catch(function(err) {
      console.log(err);
    });
}

