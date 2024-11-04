import { useState } from 'react'

import './button.css'

const colors = [ 'red', 'green', 'blue', 'yellow', 'violet' ]; 

const Button = () =>{
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
    return (
        <>
          <div>

            <button  className="card" style={{ backgroundColor: colors[currentColorIndex] }}
            onClick={() => {
              setCurrentColorIndex((currentColorIndex + 1) % colors.length);
            }} >
            <p>next color :  {colors[(currentColorIndex + 1) % colors.length]} </p>
            </button>
          </div>
          
        </>
      )
}

export default Button;