import React, { useState } from 'react';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([
    { title: 'The Shawshank Redemption', genre: 'Drama', release: 1994 },
    { title: 'Inception', genre: 'Science Fiction', release: 2010 },
    { title: 'The Dark Knight', genre: 'Action', release: 2008 }
  ]);

  const [selectedGenre, setSelectedGenre] = useState('All');

  // ## Render the list of movies with the following format: movie title, genre, release year... each movie should be displayed as a separate list item or card
  // ## implement filter functionality, create a drop down select element that contains all the unique genres from the movies list
  // ## when a genre is selected, only the movies with that genre should be displayed
  // ## if the user selects all genres from the dropdown, display all movies


  const uniqueGenres = ['All', ...new Set(movies.map(movie => movie.genre))];
  const filteredMovies = selectedGenre === 'All' ? movies : movies.filter(movie => movie.genre === selectedGenre);

    // ## when a user clicks on a movie, display an alert with the movie title

    const handleMovieClick = (title) => {
      alert(`Movie: ${title}`);
    };


    return (
      <div className="MovieList">
        <h1>Movie List</h1>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          {uniqueGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <ul>
          {filteredMovies.map((movie, index) => (
            <li key={index} onClick={() => handleMovieClick(movie.title)}>
              <h2>{movie.title}</h2>
              <p>{movie.genre}</p>
              <p>{movie.release}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default MovieList;