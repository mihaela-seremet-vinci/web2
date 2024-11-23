import { useEffect, useState } from "react"

interface Dog {
    
    photo: string
}

const RandomdDod = () => {  
    const[dog, setDog] = useState<Dog | null>(null);

    useEffect(() => {   
        fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setDog({
             
                photo: data.message
            });
            console.log(data)
        })
        .catch((err) => {
            console.error("HomePage::error: ", err);
        });
    }, [setDog]) ;

    return (
        <>
            <h1>DOG</h1>
            <img src={dog?.photo} alt="dog" style={{ maxHeight: 100 }} />  
        </>
    )
}

export default RandomdDod  ;