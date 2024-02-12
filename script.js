const api_key = "e49cb0c82c8585d807aa87477fa0eaa4";
const urlBase = "https://api.themoviedb.org/3/search/movie";
const urlImg = "https://image.tmdb.org/t/p/w200";

document.getElementById("searchButton").addEventListener("click", searchMovies);
let resultContainer = document.getElementById("results");

async function searchMovies() {
  resultContainer.innerHTML = "Loading ...";

  const searchInput = document.getElementById("searchInput").value;

  const data = await fetch(
    `${urlBase}?&query=${searchInput}&api_key=${api_key}`
  ).then(response => response.json());
  
  displayMovies(data.results);
}


function displayMovies(movies) {
  resultContainer.innerHTML = "";

  if (movies.length === 0) {
    resultContainer.innerHTML = "<p>No results found for your search</p>";
    return;
  }

  movies.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let title = document.createElement("h2");
    title.textContent = movie.title;

    let releaseDate = document.createElement("p");
    releaseDate.textContent = "Release Date: " + movie.release_date;

    let overview = document.createElement("p");
    overview.textContent = movie.overview;

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement("img");
    poster.src = posterPath;
    poster.alt = "Image not found";

    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);
  });
}
