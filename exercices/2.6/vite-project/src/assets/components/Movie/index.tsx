import { useState } from "react";

interface Movie {
  title: string;
  director: string;
  description: string;
}

interface MovieProps {
  movie: Movie;
}

const Movie = ({ movie }: MovieProps) => {
    const [click, setClick] = useState(false);
  return (
    <div 
    onClick={ () => setClick(!click)}
    >
        <p>
          <strong>{movie.title}</strong> - Réalisateur : {movie.director}
          {click ? <p>{movie.description}</p> : null}
        </p>
    </div>
  );
};

export default Movie;
