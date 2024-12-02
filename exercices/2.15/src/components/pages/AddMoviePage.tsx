import { useOutletContext } from "react-router-dom";
import AddMovieForm from "../AddMovieForm";
import { MovieContext } from "../../types";

//import { Movie } from "../../types";
//import { useState } from "react";


const AddMoviePage = () => {  
    const { onMovieAdded }: MovieContext = useOutletContext();
    return (
        <div>
        <h1>Add Movie</h1>
        <AddMovieForm onMovieAdded={onMovieAdded} />
        <br /><br /><br /><br />
        </div>
    );
}
export default AddMoviePage;