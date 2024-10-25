
import Movie from "../Movie";

  
  interface CinemaProps {
    name: string;
    movies: Movie[];
  }
   

const Cinema = (props: CinemaProps) => {
    return (
      <div>
        <h2>{props.name}</h2>
        <ul>
          {props.movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </ul>
      </div>
    );
  };

  export default Cinema;
