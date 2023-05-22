(function(){
  const API_KEY = '20fa8e9fd0c7311256a7409b62232ce1';
  const latestMovies = document.querySelector('#latest-movies');

  const getMovies = async () => {
    try{
      const response = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
      const data = await response.json();
      const movies = data.results;
      
      movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        const movieImg = document.createElement('img');
        movieImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieItem.appendChild(movieImg);
        const movieTitle = document.createElement('h2');
        movieTitle.innerText = movie.original_title;
        movieItem.appendChild(movieTitle);
        latestMovies.appendChild(movieItem);
      });
    }
    catch(error){
      console.log(error);
    }
  }
  getMovies();
})();