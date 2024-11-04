import { SyntheticEvent, useState } from 'react'
//import { Movie } from '../../types'; 
import './App.css'
import Movies from './Movies';
import { Movie } from '../types';

const defaultMovies = [
  {
    id: 1,
    title: "movie1",
    director: "director1",
    duration: 120,
  },
  {
    id: 2,  
    title: "movie2",
    director: "director12",
    duration: 140,
  },
  {
    id: 3, 
    title: "movie3",
    director: "director3",
    duration: 90,
  },  
  {
    id: 4, 
    title: "movie4",
    director: "director4",
    duration: 100,
  },
  {
    id: 5, 
    title: "movie5",
    director: "director5",
    duration: 150,
  },
];

function App() {
  
  const [movies, setMovies] = useState(defaultMovies);
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);



  const handleSubmit = (e: SyntheticEvent) => {      
    e.preventDefault();
    const newMovie = {
     id: nextMovieId(movies),
      title: name,
      director: director,
      duration: duration,
    };

    setMovies(movies.concat(newMovie));
    
  }

  const handleNameChange = (e: SyntheticEvent) => {
    const nameInput = e.target as HTMLInputElement;
    setName(nameInput.value);
  };

  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement;
    setDirector(directorInput.value);
  };


  const handleDurationChange = (e: SyntheticEvent) => {
    const durationInput = e.target as HTMLInputElement;
    setDuration(parseInt(durationInput.value)); 
  };



  return (
    <>
      <Movies movies={movies} />
      
      <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="title ">Title</label>
        <input type="text"  id='name' name='name' 
        onChange={handleNameChange}/>
        <label htmlFor="Director">Director</label>
        <input type="text" id='director' name='director'  
        onChange={handleDirectorChange}
        /> 
        <label htmlFor="Duration">Duration </label>
        <input type="text" id='duration' name='duration'  
        onChange={handleDurationChange}
        />
        <button type="submit">Add Movie</button>
        </form>


      </div>
      
    </>
  )
}


const nextMovieId = (movies: Movie[]) => {
  return movies.reduce((maxId, movie) => Math.max(maxId, movie.id), 0) + 1;
};
export default App
