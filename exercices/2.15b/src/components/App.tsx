import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Movie, MovieContext, NewMovie } from "../types";

import { Outlet, useNavigate } from "react-router-dom";

/*const defaultMovies : Movie[]= [
  {
    id: 1,
    title: "Shang-Chi and the Legend of the Ten Rings",
    director: "Destin Daniel Cretton",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    budget: 150,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    budget: 63,
  },
  {
    id: 3,
    title: "Summer Wars",
    director: "Mamoru Hosoda",
    duration: 114,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },
  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  },
  {
    id: 5,
    title: "her",
    director: "Spike Jonze",
    duration: 126,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    budget: 23,
  },
];*/


const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect ( () => { 
    fetchMovies() ;
  } ,[])

  const fetchMovies = async () => { 
    try{
      const movies = await getAllMovies(); //voir fonction en bas 
      setMovies(movies);
    }catch(error){
      console.error("fetchMovies::error: ", error);
    }
  }

  const navigate = useNavigate();
  const addMovie = async (newMovie: NewMovie) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/films", options);
      console.log("response: ", response);
      if (!response.ok) {
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }
      const createdMovie = await response.json();
      setMovies([...movies, createdMovie]);
      navigate("movie-list");

    } catch (error) { 
      console.error("addMovie::error: ", error);
    }
  };

  const deleteMovie = async (movie: Movie) => {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(`/api/films/${movie.id}`, options);
      if (!response.ok) {
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }
      setMovies(movies);
      navigate("movie-list");
    } catch (error) {
      console.error("deleteMovie::error: ", error);
    }
  };


  

  console.log("movies: ", movies);
  const fullMovieContext: MovieContext = {
     movies,
     onMovieAdded: addMovie, 
     onMovieDeleted: deleteMovie,
  };

  return (
    <div>
       <Header urlLogo="https://media.istockphoto.com/id/1429764305/fr/vectoriel/bande-de-film-vierge-isol%C3%A9e-sur-le-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=is5Y6cun0NC8PxJd51p4YnUoLUpyb758Bdigh4Bqn48=">
        <h1>Tous sur les films</h1>
       <NavBar/>
      </Header>

      <main className="page-content">
        <Outlet context={fullMovieContext} />
      </main>
     

      <Footer urlLogo="https://media.istockphoto.com/id/1202770152/fr/photo/bobine-de-film-disolement-sur-le-fond-jaune-lumineux-dans-les-couleurs-pastel.jpg?s=1024x1024&w=is&k=20&c=2yKBrC8oyimPdW-5IxFWN_zxFPVK3KWYL9OE2gVmVX4=">
        <p>© myMovies</p>
      </Footer>
    </div>
  );
};



async function getAllMovies(){
  try{

    const response = await fetch("/api/films"); 
    if(!response.ok){
      throw new Error("Something went wrong");
    }
    const movies = await response.json();
    return movies;
  }catch(error){  
    console.error("getAllMovies::error: ", error);
    throw error; 
}
}; 

export default App;