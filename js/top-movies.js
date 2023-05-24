(function(){
  const latestMovies = document.querySelector('#top-movies');
  const topMovies = async () => {
    try{
      const response = await fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      const movies = data.results;
      let counter = 0;

      movies.forEach(async movie => {
        if (counter >= 4) {
          return; 
        }
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;
        const movieItemBackgroundFilter = document.createElement('div');
        movieItemBackgroundFilter.classList.add('movie-item-background-filter');
        const movieImg = document.createElement('img');
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieItem.appendChild(movieImg);
        const movieTitle = document.createElement('h2');
        movieTitle.innerText = movie.original_title;
        movieItem.appendChild(movieTitle);
        movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);
        latestMovies.appendChild(movieItem);

        counter++;

        try {
          const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
          const movieDetails = await movieDetailsResponse.json();
          const imdbId = movieDetails.imdb_id;
          const imdbLink = `https://www.imdb.com/title/${imdbId}`;
  
          movieItem.addEventListener('click', () => {
            window.location.href = imdbLink;
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
    catch(error){
      console.log(error);
    }
  }

  window.topMovies = topMovies;
})();