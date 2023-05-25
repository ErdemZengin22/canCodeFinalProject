(function() {
  // Get the DOM element for displaying top people
  const topPeopleSection = document.querySelector('#top-people');

  // Define the function for retrieving and displaying top people
  const topPeople = async () => {
    try {
      // Fetch the data for trending people from the API
      const response = await fetch(`https://api.themoviedb.org/3/trending/person/day?language=en-US&api_key=${API_KEY}`);
      const data = await response.json();
      
      // Get the top 4 trending people from the response
      const people = data.results.splice(0, 4);
      
      // Iterate over each person
      people.forEach(async person => {
        // Create a container element for the person
        const personItem = document.createElement('div');
        personItem.classList.add('movie-item');
        
        // Set the background image of the person container
        personItem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${person.profile_path}')`;
        
        // Create a background filter element for the person container
        const personItemBackgroundFilter = document.createElement('div');
        personItemBackgroundFilter.classList.add('movie-item-background-filter');
        
        // Create an image element for the person
        const personImg = document.createElement('img');
        personImg.src = `https://image.tmdb.org/t/p/w500${person.profile_path}`;
        personItem.appendChild(personImg);
        
        // Create a title element for the person
        const personTitle = document.createElement('h2');
        personTitle.innerText = person.name;
        personItem.appendChild(personTitle);
        
        // Create an element to display the reason for popularity
        const popularFor = document.createElement('div');
        popularFor.classList.add('popular-for');
        
        // Get the original title or name of the known work for popularity reason
        const popularityReason = person.known_for[0].original_title ? person.known_for[0].original_title : person.known_for[0].original_name;
        popularFor.innerHTML = `<span>Popular for: </span><br>${popularityReason}`;
        personItem.appendChild(popularFor);
        
        // Insert the person item background filter element before the end of the person container
        personItem.insertAdjacentElement('beforeend', personItemBackgroundFilter);
        
        // Append the person container to the top people section
        topPeopleSection.appendChild(personItem);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  // Expose the topPeople function to the global scope
  window.topPeople = topPeople;
})();
