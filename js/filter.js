(function() {
  // Selecting elements from the DOM
  const genreDropdown = document.querySelector('#genre-dropdown');
  const filterResults = document.querySelector('#filter');
  let genreID;

  // Function to fetch and filter movies based on genre
  const movieFilter = async () => {
    try {
      // Fetching genre data from the API
      const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const genreData = await genreResponse.json();
      const genreNames = genreData.genres;

      // Populating genre dropdown options
      genreNames.forEach(async (genre) => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.innerHTML = genre.name;
        genreDropdown.appendChild(option);
      });

      // Event listener for genre dropdown change
      genreDropdown.addEventListener('change', async () => {
        genreID = genreDropdown.value;
        filterResults.innerHTML = '';

        try {
          // Fetching popular movies from the API
          const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${API_KEY}`);
          const data = await response.json();
          const movies = data.results;

          // Filtering movies based on selected genre
          const filteredMovies = movies.filter(movie => movie.genre_ids.includes(parseInt(genreID)));

          // Displaying filtered movies
          filteredMovies.forEach(async (movie) => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;

            // Creating movie item components

            // Create a div element for the movie item's background filter
            const movieItemBackgroundFilter = document.createElement('div');
            movieItemBackgroundFilter.classList.add('movie-item-background-filter');

            // Create an img element for the movie poster
            const movieImg = document.createElement('img');
            movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            movieItem.appendChild(movieImg);

            // Create a div element for the movie rating
            const movieRating = document.createElement('div');
            movieRating.classList.add('movie-rating');
            movieRating.innerText = movie.vote_average.toFixed(1);
            movieItem.appendChild(movieRating);

            // Create an h2 element for the movie title
            const movieTitle = document.createElement('h2');
            movieTitle.innerText = movie.original_title;
            movieItem.appendChild(movieTitle);

            // Create a div element for the movie actors
            const movieActors = document.createElement('div');
            movieActors.classList.add('movie-actors');

            try {
              // Fetching actors for the current movie
              const actorsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`);
              const actors = await actorsResponse.json();
              const topActors = actors.cast.splice(0, 3);
              const actorNames = topActors.map(actor => actor.name);
              const actorNamesString = actorNames.join(", ");
              movieActors.textContent = actorNamesString;
            } catch (error) {
              console.log(error);
            }

            // Appending movie components to the filter results
            movieItem.appendChild(movieActors);
            movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);
            filterResults.appendChild(movieItem);
            filterResults.scrollIntoView();
          });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Exposing the movieFilter function to the window object
  window.movieFilter = movieFilter;
})();
