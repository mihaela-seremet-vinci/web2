import { useEffect, useState } from "react"

interface Dog {
    
    photo: string
}

const RandomdDod = () => {  
    const[dog, setDog] = useState<Dog | null>(null);

    useEffect(() => { 
        fetchDog();
        setInterval(() => { fetchDog(); }, 5000); 
        
    }, [setDog]) ;


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
            <img src={dog?.photo} alt="dog" style={{ maxHeight: 100 }} />  
        </>
    )
}

export default RandomdDod  ;