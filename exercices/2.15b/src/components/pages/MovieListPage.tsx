import { MovieContext } from "../../types";


import MovieListView from "../MovieListView";
import PageTitle from "../PageTitle";

import { useOutletContext } from "react-router-dom";

const MovieListPage = () => {   
    
    const {movies, onMovieDeleted} : MovieContext = useOutletContext(); 

      return(
        <div>

        <main className="page-content">
        <PageTitle title="My favorite movies" />

        <MovieListView movies={movies}  onMovieDeleted={onMovieDeleted}/>


        <br /><br /><br /><br />
      </main>
        </div>

       
    )

}
export default MovieListPage;