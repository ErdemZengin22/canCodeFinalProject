(function(){
  const topPeopleSection = document.querySelector('#top-people');
  const topPeople = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/person/day?language=en-US&api_key=${API_KEY}`);
      const data = await response.json();
      const people = data.results.splice(0, 4);
      people.forEach(async person => {
        const personItem = document.createElement('div');
        personItem.classList.add('movie-item');
        personItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${person.profile_path}')`;
        const personItemBackgroundFilter = document.createElement('div');
        personItemBackgroundFilter.classList.add('movie-item-background-filter');
        const personImg = document.createElement('img');
        personImg.src = `https://image.tmdb.org/t/p/w500${person.profile_path}`;
        personItem.appendChild(personImg);
        const personTitle = document.createElement('h2');
        personTitle.innerText = person.name;
        personItem.appendChild(personTitle);
        const popularFor = document.createElement('div');
        popularFor.classList.add('popular-for');
        const popularityReason = person.known_for[0].original_title ? person.known_for[0].original_title : person.known_for[0].original_name;
        popularFor.innerHTML = `<span>Popular for: </span><br>${popularityReason}`;
        personItem.appendChild(popularFor);
        personItem.insertAdjacentElement('beforeend', personItemBackgroundFilter);
        topPeopleSection.appendChild(personItem);
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  window.topPeople = topPeople;
})();