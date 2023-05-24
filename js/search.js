(function(){
  const searchInput = document.querySelector('#movie-search');
  const searchMovies = async () => {
    const userInput = searchInput.value;
    try{
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&api_key=${API_KEY}&query=${userInput}`);
      const data = await response.json();
      let movies = data.results.slice(0, 6);
      
    
    const searchContainer = document.querySelector('.nav-item.search');
    const existingSearchResults = document.querySelector('#search-results');
    if (existingSearchResults) {
      searchContainer.removeChild(existingSearchResults);
    }
    const searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchContainer.appendChild(searchResults);

    movies = movies.filter(movie => movie.poster_path);
    
    movies.forEach(async (movie) => {
      
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');
      movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;
      const movieItemBackgroundFilter = document.createElement('div');
      movieItemBackgroundFilter.classList.add('movie-item-background-filter');
      const movieItemInnerContainer = document.createElement('div');
      movieItemInnerContainer.classList.add('movie-item-inner-container');
      movieItem.appendChild(movieItemInnerContainer);
      const leftContainer = document.createElement('div');
      leftContainer.classList.add('left-container');
      movieItemInnerContainer.appendChild(leftContainer);
      const movieImg = document.createElement('img');
      movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      leftContainer.appendChild(movieImg);
      const rightContainer = document.createElement('div');
      rightContainer.classList.add('right-container');
      movieItemInnerContainer.appendChild(rightContainer);
      const movieTitle = document.createElement('h2');
      movieTitle.innerText = movie.original_title;
      rightContainer.appendChild(movieTitle);
      const movieOverview = document.createElement('p');
      const overviewText = movie.overview;
      movieOverview.innerText = overviewText.substring(0, 250) + '...';
      rightContainer.appendChild(movieOverview);
      movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);
      searchResults.appendChild(movieItem);

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

    window.addEventListener('click', (event) => {
      if (searchResults.parentNode && !searchResults.contains(event.target)) {
        searchResults.parentNode.removeChild(searchResults);
        searchInput.value = '';
      }
    });
    }
    catch (error) {
      console.log(error);
    }
    
  }
  searchInput.addEventListener('input', searchMovies);
  
  window.searchMovies = searchMovies;
})();