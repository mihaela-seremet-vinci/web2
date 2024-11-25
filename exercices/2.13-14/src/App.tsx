import { useEffect, useState } from 'react'
import './App.css'

interface Joke { 
  joke: string,
  category: string
}

function App() {
  const[joke, setJoke] = useState<Joke | null>(null); 
  const[isNew, setIsNew] = useState<boolean>(false);

  
   
    const useFetch=() => { 

    fetch("https://v2.jokeapi.dev/joke/Dark?type=single")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJoke({
          joke: data.joke ?? "No joke found",
          category: data.category ?? "Unknown",
        });
      })
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });

    }

     
     useEffect(() => {
        useFetch();
        setInterval(() => { useFetch(); }, 5000);  
     }, []);


  
  if (!joke) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>JOKE</h1>
      <p>Category: {joke.category}</p> 

      <p>{joke.joke}</p>


    </>
  )
}

export default App
