# Movie Search

## Step 1: API Configuration

Before you begin, you'll need to obtain an API key from TMDb. You can get an API key by registering on the [TMDb website](https://www.themoviedb.org/). Once you have your API key, replace `'API_KEY'` in the code with your API key.

```javascript
let api_key = 'YOUR_API_KEY'
```

## Step 2: API URL Definitions

Next, we will define the base URLs for the API and the movie images. These URLs will be used for movie search and displaying movie images, respectively.

```javascript
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'
```

## Step 3: DOM Element Retrieval

In this step, we retrieve the necessary HTML elements to interact with the application. We use `getElementById` to get the search button and the text input field.

```javascript
document.getElementById('searchButton').addEventListener('click', searchMovies)
let resultContainer = document.getElementById('results')
```

## Step 4: Movie Search Function

The `searchMovies` function is executed when the search button is clicked. It gets the value entered in the text input field and makes a request to the TMDb API to search for movies that match the search term.

```javascript
function searchMovies(){
    resultContainer.innerHTML = 'Loading...'
    let searchInput = document.getElementById('searchInput').value
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results))
}
```

## Step 5: Function to Display Found Movies

The `displayMovies` function is used to show the results of the movie search. It clears the previous content of the results container and then iterates over the list of found movies. For each movie, it creates HTML elements to display its title, release date, overview, and poster.

```javascript
function displayMovies(movies){
    resultContainer.innerHTML = ''

    if(movies.length === 0){
        resultContainer.innerHTML= '<p>No results found for your search </p>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'Release Date: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultContainer.appendChild(movieDiv)
    })
}
```