import { Link } from 'react-router-dom';
import {Movie} from '../types'; 

interface MovieTitleListProps {
    movies: Movie[];
}

const MovieTitleList = ({movies}: MovieTitleListProps) => { 
    return (
        <div>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.title}>
                       <Link to={`/movies/${movie.id}`}>{movie.title}</Link> </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieTitleList;