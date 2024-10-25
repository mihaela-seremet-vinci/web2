import { useState } from 'react'

interface ClickCounterProps { 
    title: string
    message ? : string
    messageHoover ? : string
}

const ClickCounter  = ({
     title,
     message ="You are a master in the art of clicking !", 
     messageHoover ="Click me "}: ClickCounterProps) => {
    const [count, setCount] = useState(0); 
    const [hoover, setHoover] = useState(false);
    
    return(
       <>
        <h4>{title}</h4>

        < button onClick = {() => setCount((count) => count + 1) }
            onMouseEnter = { ()=>  setHoover(true) }
            onMouseLeave={ ()=> setHoover(false) }
        >
        {hoover ? <p>{messageHoover}</p> : null}
        count is { count }
        {count>=10 ?  <p> {message} </p> : null}  
        </button >

        </>
    );
    
      
}

export default ClickCounter;