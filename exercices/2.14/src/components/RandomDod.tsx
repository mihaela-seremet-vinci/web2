import { useEffect, useState } from "react"

interface Dog {
    
    photo: string
}

const RandomdDod = () => {  
    const[dog, setDog] = useState<Dog | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {fetchDog()}, []);

    useEffect(() => { 
       // setInterval(() => { fetchDog(); }, 5000); 

       const interval = setInterval(() => {    
        if (!isHovered) {
          fetchDog();
        }
      }, 5000);
  
      return () => clearInterval(interval); 
    }, [isHovered]) ;


    const fetchDog = async () => {  
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            setDog({
                photo: data.message
            });
            console.log(data);

        } catch (error) {
            console.error("Error fetching dog image:", error);
        }
    }


    return (
        <>
            <h1>DOG</h1>
            <img src={dog?.photo} alt="dog" style={{ maxHeight: 100 }} 
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)} />  

            
        </>
    )
}

export default RandomdDod  ;