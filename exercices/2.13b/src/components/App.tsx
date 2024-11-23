import { useState } from 'react'
import RandomDod from './RandomDod'
import './App.css'

function App() {
  const [clicks, setClick] = useState(false);
  console.log(clicks);
  return (
    <>
     <button onClick = {() => setClick(!clicks )}>
       <p>Press to resfresh</p>
    </button>
   
    < RandomDod  key ={`${clicks}1`}/>
    < RandomDod  key ={`${clicks}2`}/>
    < RandomDod key = {`${clicks}3`} />
   
    </>
  )
  
}

export default App
