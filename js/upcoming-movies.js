(function (){
  const upcomingMovies = document.querySelector('#upcoming-movies');
  const comingMovies = async () => {
    try{
      const response = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=2023-06-01`);
      const data = await response.json();
      const movies = data.results.slice(0, 4);
      const formatDate = (dateResponse) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateResponse);
        return date.toLocaleDateString('en-US', options);
      };

      movies.forEach(async movie => {
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
        upcomingMovies.appendChild(movieItem);
        const hypeScore = document.createElement('div');
        hypeScore.classList.add('hype-score');
        hypeScore.innerText = 'Hype: ' + movie.popularity.toFixed(0);
        movieItem.appendChild(hypeScore);
        const movieDate = document.createElement('p');
        const formattedDate = formatDate(movie.release_date);
        movieDate.innerHTML = `<span>Releasing:</span> ${formattedDate}`;
        movieDate.classList.add('movie-release-date');
        movieItem.appendChild(movieDate);

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

  window.comingMovies = comingMovies;
})();