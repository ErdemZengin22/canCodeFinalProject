(function(){
  const API_KEY = '20fa8e9fd0c7311256a7409b62232ce1';
  const latestMovies = document.querySelector('#latest-movies');
  const upcomingMovies = document.querySelector('#upcoming-movies');

  const topMovies = async () => {
    try{
      const response = await fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      const movies = data.results;

      let counter = 0;

      movies.forEach(movie => {
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
      });
    }
    catch(error){
      console.log(error);
    }
  }
  const comingMovies = async () => {
    try{
      const response = await fetch (`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
      const data = await response.json();
      const movies = data.results;

      let counter = 0;

      const formatDate = (dateResponse) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateResponse);
        return date.toLocaleDateString('en-US', options);
      };

      movies.forEach(movie => {
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
        upcomingMovies.appendChild(movieItem);
        const movieDate = document.createElement('p');
        const formattedDate = formatDate(movie.release_date);
        movieDate.innerHTML = `<span>Releasing:</span> ${formattedDate}`;
        movieDate.classList.add('movie-release-date');
        movieItem.appendChild(movieDate);

        counter++;
      });
    }
    catch(error){
      console.log(error);
    }
  }
  topMovies();
  comingMovies();
})();