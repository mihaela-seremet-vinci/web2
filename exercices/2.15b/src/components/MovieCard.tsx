import { useState } from "react";
import { Movie } from "../types";
import "./MovieCard.css";


interface MovieCardProps {
  movie: Movie;
  onMovieDeleted: (movie: Movie) => void;
}

const MovieCard = ({ movie, onMovieDeleted}: MovieCardProps) => {
  const [click, setClick] = useState(false);



  return (

    <div className="card">
     
      <div  onClick={ () => setClick(!click)}  className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        {movie.imageUrl && (
        <img src={movie.imageUrl} className="card-img-top" alt={movie.title} />
        )}
        <p className="card-text">
          <strong>Réalisateur :</strong> {movie.director}
        </p>
        <p className="card-text">
          <strong>Durée :</strong> {movie.duration} minutes
        </p>
        {movie.budget && (
          <p className="card-text">
            <strong>Budget :</strong> {movie.budget} millions de dollars
          </p>
        )}
        
        {movie.description && (
          <p  className="card-text">
            <strong>Description :</strong> {click ? <p>{movie.description}</p> : null}
          </p>
        )}
      
      </div>
      <div>
        <button onClick={() => onMovieDeleted(movie)}> DELETE </button>
      </div>
    </div>
  );
};

export default MovieCard;
