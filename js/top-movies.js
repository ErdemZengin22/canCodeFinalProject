(function() {
  // Get the DOM element for displaying the latest movies
  const latestMovies = document.querySelector('#top-movies');
  
  // Define the function for retrieving and displaying top movies
  const topMovies = async () => {
    try {
      // Fetch the latest movie data from the API
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      
      // Get the top 4 movies from the response
      const movies = data.results.splice(0, 4);
      
      // Iterate over each movie
      movies.forEach(async movie => {
        // Create a container element for the movie
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        
        // Set the background image of the movie container
        movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;
        
        // Create a background filter element for the movie container
        const movieItemBackgroundFilter = document.createElement('div');
        movieItemBackgroundFilter.classList.add('movie-item-background-filter');
        
        // Create an image element for the movie poster
        const movieImg = document.createElement('img');
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieItem.appendChild(movieImg);
        
        // Create a rating element for the movie
        const movieRating = document.createElement('div');
        movieRating.classList.add('movie-rating');
        movieRating.innerText = movie.vote_average.toFixed(1);
        movieItem.appendChild(movieRating);
        
        // Create a title element for the movie
        const movieTitle = document.createElement('h2');
        movieTitle.innerText = movie.original_title;
        movieItem.appendChild(movieTitle);
        
        // Create an element for displaying the movie actors
        const movieActors = document.createElement('div');
        movieActors.classList.add('movie-actors');
        
        try {
          // Fetch the movie credits to get the list of actors
          const actorsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`);
          const actors = await actorsResponse.json();
          
          // Get the top 3 actors from the response
          const topActors = actors.cast.splice(0, 3);
          
          // Extract the names of the actors
          const actorNames = topActors.map(actor => actor.name);
          
          // Join the actor names into a single string
          const actorNamesString = actorNames.join(", ");
          
          // Set the text content of the movie actors element
          movieActors.textContent = actorNamesString;
        } catch (error) {
          console.log(error);
        }
        
        // Append the movie actors element to the movie container
        movieItem.appendChild(movieActors);
        
        // Insert the movie item background filter element before the end of the movie container
        movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);
        
        // Append the movie container to the latest movies DOM element
        latestMovies.appendChild(movieItem);
        
        try {
          // Fetch additional movie details to get the IMDb ID
          const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
          const movieDetails = await movieDetailsResponse.json();
          const imdbId = movieDetails.imdb_id;
          
          // Create the IMDb link based on the IMDb ID
          const imdbLink =`https://www.imdb.com/title/${imdbId}`;
          
          // Add a click event listener to the movie container to redirect to the IMDb link
          movieItem.addEventListener('click', () => {
            window.location.href = imdbLink;
          });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  // Expose the topMovies function to the global scope
  window.topMovies = topMovies;
})();
