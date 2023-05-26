# CanCode Movie Website

Welcome to the CanCode Movie Website project! This is a simple website where users can search for movies, view today's top 4 movies, upcoming top 4 movies, top 4 popular actors, and filter movies by genres.

## Technologies Used

The Movie Website project utilizes the following technologies:

- HTML
- CSS
- JavaScript
- Async & Await
- The Movie Database (TMDb) API

## JavaScript Files

The project's JavaScript files are located in the js/ directory and serve different functionalities within the website.

- **api.js:** Contains API key for making API calls using asynchronous techniques.
- **filter.js:** Handles the movie filtering functionality based on genres.
- **main.js:** Contains shared code and attaches it to the window object.
- **search.js:** Handles the movie search functionality.
- **today.js:** Retrieves and displays today's top movies.
- **top-movies.js:** Retrieves and displays the top movies section.
- **top-people.js:** Retrieves and displays the top actors section.
- **upcoming-movies.js:** Retrieves and displays the upcoming movies section.

Please refer to the script files for further information and details.

## CSS Styling

The project's CSS file, css/main.css, contains the styles for the website's layout, sections, and elements.

# Getting Started

To get started with the Movie Website project, follow these steps:

- Simply view the live version on github: https://erdemzengin22.github.io/canCodeFinalProject/

or

1.  Clone the repository to your local machine: `git clone <repository_url>`
2.  Navigate to the project directory: `cd movie-website`
3. Open the project in your preferred code editor.
4. Run the website using a local development server of your choice. You can use tools like Live Server or any other server you prefer.
5. Ensure you have a stable internet connection as the website makes API calls to fetch data.
6. Access the website by opening it in your browser.

# Usage

Upon opening the Movie Website in your browser, you will be presented with a single-page layout containing the following sections:

**Movie Search:** Use the search bar at the top to search for movies.

**Today's Top 4 Movies:** View the top 4 movies of the day.

**Upcoming:** See the top 4 upcoming movies.

**Top 4 Actors:** Discover the top 4 popular actors.

**Filter:** Filters among popular movies based on genres.

Feel free to explore the website, interact with the different sections, and enjoy the movie browsing experience

# Credits

This project is developed by [Erdem Zengin](https://www.linkedin.com/in/erdem-zengin/). If you have any questions or suggestions, feel free to contact me.

The project is powered by [The Movie Database (TMDb)](https://www.themoviedb.org).

## Notice

I wanted to provide a brief notice regarding the development of this project. I have intentionally limited the number of API calls made by this project. This decision was made to eliminate unnecessary network traffic and optimize the overall performance of the website. By minimizing API requests, I aim to ensure a smoother user experience.