import { MovieContext } from "../../types";


import MovieTitleList from "../MovieTitleList";
import PageTitle from "../PageTitle";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {   
    
    const {movies} : MovieContext = useOutletContext(); 

      return(
        <div>

        <main className="page-content">
        <PageTitle title="movies" />
        <MovieTitleList movies={movies} />
        <br /><br /><br /><br />
      </main>
        </div>

       
    )

}
export default HomePage;