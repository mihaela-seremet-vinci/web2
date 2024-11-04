import { Movie } from "../types";
import './Movies.css';
interface MoviesProps {
    movies: Movie[];
}

const Movies = ({ movies }: MoviesProps) => {  

    return (
        <table className="movies">
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Director</th>
                    <th>Duree</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.director}</td>
                        <td>{movie.duration}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )


}
export default Movies;