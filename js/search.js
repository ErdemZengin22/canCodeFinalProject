(function() {
  // Immediately invoked anonymous function

  // Selecting the search input element from the DOM
  const searchInput = document.querySelector('#movie-search');

  // Function to search movies
  const searchMovies = async () => {
    const userInput = searchInput.value;

    try {
      // Fetching movie data from the API based on user input
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&api_key=${API_KEY}&query=${userInput}`);
      const data = await response.json();
      // Select the first 6 movies from the API response
      let movies = data.results.slice(0, 6);

      // Selecting the search container and existing search results
      const searchContainer = document.querySelector('.nav-item.search');
      const existingSearchResults = document.querySelector('#search-results');

      // Remove existing search results if present
      if (existingSearchResults) {
        searchContainer.removeChild(existingSearchResults);
      }

      // Creating a new search results container
      const searchResults = document.createElement('div');
      searchResults.id = 'search-results';
      searchContainer.appendChild(searchResults);

      // Filtering movies without a poster path
      movies = movies.filter(movie => movie.poster_path);

      // Displaying search results for each movie
      movies.forEach(async (movie) => {
        // Creating a div element for the movie item
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');
  movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;

  // Creating a div element for the movie item's background filter
  const movieItemBackgroundFilter = document.createElement('div');
  movieItemBackgroundFilter.classList.add('movie-item-background-filter');

  // Creating a div element for the inner container of the movie item
  const movieItemInnerContainer = document.createElement('div');
  movieItemInnerContainer.classList.add('movie-item-inner-container');
  movieItem.appendChild(movieItemInnerContainer);

  // Creating a div element for the left container of the movie item
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('left-container');
  movieItemInnerContainer.appendChild(leftContainer);

  // Creating an img element for the movie poster
  const movieImg = document.createElement('img');
  movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  leftContainer.appendChild(movieImg);

  // Creating a div element for the right container of the movie item
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-container');
  movieItemInnerContainer.appendChild(rightContainer);

  // Creating an h2 element for the movie title
  const movieTitle = document.createElement('h2');
  movieTitle.innerText = movie.original_title;
  rightContainer.appendChild(movieTitle);

  // Creating a p element for the movie overview
  const movieOverview = document.createElement('p');
  const overviewText = movie.overview;
  movieOverview.innerText = overviewText.substring(0, 250) + '...';
  rightContainer.appendChild(movieOverview);

  // Appending the movie item's background filter to the movie item
  movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);

  // Appending the movie item to the search results container
  searchResults.appendChild(movieItem);

        try {
          // Fetching movie details to get the IMDb ID
          const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
          const movieDetails = await movieDetailsResponse.json();
          const imdbId = movieDetails.imdb_id;
          const imdbLink = `https://www.imdb.com/title/${imdbId}`;

          // Redirecting to IMDb page when a movie item is clicked
          movieItem.addEventListener('click', () => {
            window.location.href = imdbLink;
          });
        } catch (error) {
          console.log(error);
        }
      });

      // Closing search results when clicking outside the results
      window.addEventListener('click', (event) => {
        // Check if the search results container has a parent node and if the clicked target is not within the search results container
        if (searchResults.parentNode && !searchResults.contains(event.target)) {
          // Remove the search results container from its parent node**
          searchResults.parentNode.removeChild(searchResults);
          // Reset the value of the search input field
          searchInput.value = '';

          // **The parent node is the immediate container or element that holds another element within the DOM structure.
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Adding an event listener to the search input for triggering movie search
  searchInput.addEventListener('input', searchMovies);

  // Exposing the searchMovies function to the window object
  window.searchMovies = searchMovies;
})();
