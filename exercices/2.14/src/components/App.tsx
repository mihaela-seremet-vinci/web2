import { useState } from 'react'
import RandomDod from './RandomDod'
import './App.css'

function App() {
  /*const [clicks, setClick] = useState(false);
  console.log(clicks);*/

  /* <button onClick = {() => setClick(!clicks )}>
       <p>Press to resfresh</p>
    </button>*/
    /* key ={`${clicks}1`}*/
  return (
    <>
    
   
    < RandomDod />
    < RandomDod />
    < RandomDod  />
   
    </>
  )
  
}

export default App
