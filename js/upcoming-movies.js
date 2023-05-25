(function () {
  // Get the DOM element for displaying upcoming movies
  const upcomingMovies = document.querySelector('#upcoming-movies');

  // Define the function for retrieving and displaying upcoming movies
  const comingMovies = async () => {
    try {
      // Fetch the upcoming movie data from the API
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=2023-06-01`);
      const data = await response.json();
      
      // Get the top 4 upcoming movies from the response
      const movies = data.results.slice(0, 4);
      
      // Function to format the release date of a movie
      const formatDate = (dateResponse) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateResponse);
        return date.toLocaleDateString('en-US', options);
      };
      
      // Iterate over each upcoming movie
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
        
        // Create a title element for the movie
        const movieTitle = document.createElement('h2');
        movieTitle.innerText = movie.original_title;
        movieItem.appendChild(movieTitle);
        
        // Insert the movie item background filter element before the end of the movie container
        movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);
        
        // Append the movie container to the upcoming movies DOM element
        upcomingMovies.appendChild(movieItem);
        
        // Create a hype score element for the movie
        const hypeScore = document.createElement('div');
        hypeScore.classList.add('hype-score');
        hypeScore.innerText = 'Hype: ' + movie.popularity.toFixed(0);
        movieItem.appendChild(hypeScore);
        
        // Create a release date element for the movie
        const movieDate = document.createElement('p');
        const formattedDate = formatDate(movie.release_date);
        movieDate.innerHTML = `<span>Releasing:</span> ${formattedDate}`;
        movieDate.classList.add('movie-release-date');
        movieItem.appendChild(movieDate);
        
        try {
          // Fetch additional movie details to get the IMDb ID
          const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
          const movieDetails = await movieDetailsResponse.json();
          const imdbId = movieDetails.imdb_id;
          
          // Create the IMDb link based on the IMDb ID
          const imdbLink = `https://www.imdb.com/title/${imdbId}`;
  
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
  
  // Expose the comingMovies function to the global scope
  window.comingMovies = comingMovies;
})();
