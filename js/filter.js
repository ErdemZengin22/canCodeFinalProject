(function(){
  const genreDropdown = document.querySelector('#genre-dropdown');
  const filterResults = document.querySelector('#filter');
  let genreID;
  const movieFilter = async () => {
    try{
      const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const genreData = await genreResponse.json();
      const genreNames = genreData.genres;

    genreNames.forEach(async (genre) => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.innerHTML = genre.name;
      genreDropdown.appendChild(option);
    });
    genreDropdown.addEventListener('change', async () => {
      genreID = genreDropdown.value;
      filterResults.innerHTML = '';
      console.log(genreID);

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${API_KEY}`);
        const data = await response.json();
        const movies = data.results;
        const filteredMovies = movies.filter(movie => movie.genre_ids.includes(parseInt(genreID)));
        
        filteredMovies.forEach(async (movie) => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;
        const movieItemBackgroundFilter = document.createElement('div');
        movieItemBackgroundFilter.classList.add('movie-item-background-filter');
        const movieImg = document.createElement('img');
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieItem.appendChild(movieImg);
        const movieRating = document.createElement('div');
        movieRating.classList.add('movie-rating');
        movieRating.innerText = movie.vote_average.toFixed(1);
        movieItem.appendChild(movieRating);
        const movieTitle = document.createElement('h2');
        movieTitle.innerText = movie.original_title;
        movieItem.appendChild(movieTitle);
        const movieActors = document.createElement('div');
        movieActors.classList.add('movie-actors');
        try{
          const actorsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`);
          const actors = await actorsResponse.json();
          const topActors = actors.cast.splice(0, 3);
          const actorNames = topActors.map(actor => actor.name);

          const actorNamesString = actorNames.join(", ");

          movieActors.textContent = actorNamesString;
        }
        catch (error) {
          console.log(error);
        }
        movieItem.appendChild(movieActors);
        movieItem.insertAdjacentElement('beforeend', movieItemBackgroundFilter);
        filterResults.appendChild(movieItem);
        filterResults.scrollIntoView();
        });
      }
      catch (error){
        console.log(error);
      }
    });

    

    }
    catch (error){
      console.log(error);
    }

  }

  window.movieFilter = movieFilter;
})();