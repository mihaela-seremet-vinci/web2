import {Router} from "express"; 

import { Film, NewFilm } from "../types";

const router = Router();

const defaultFilms: Film[]= [
    {
        id: 1,
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        duration: 142,
        imageUrl: "xx",
        budget: 25
      },
      {
        id: 2,
        title: "Forrest Gump",
        director: "Robert Zemeckis",
        duration: 142,
        imageUrl: "xx",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
      },
      {
        id: 3,
        title: "Fight Club",
        director: "David Fincher",
        duration: 139,
        imageUrl: "xx",
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        budget: 63
      },

]
//afficher les films selon la duree min, s'il y'a ce parametre  //apres il y'a dans REST des trucs qui permettent de faire des test avec ça 

router.get("/",(req,res)=>{
  if (req.query["minimum-duration"] === undefined) {
    console.log("undef")
    return res.json(defaultFilms);
    
  }
  const minDuration = Number(req.query["minimum-duration"]);

  if (isNaN(minDuration) || minDuration <= 0) {
    //res.json("Wrong minimum duration"); 
    res.sendStatus
  }


  const filteredFilms = defaultFilms.filter((film) => {
    return film.duration >= minDuration;
});

  return res.json(filteredFilms);
}); 

//afficher les films selon l'id(dans l'url )

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const  film = defaultFilms.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

router.post("/", (req,res)=>{
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.json("Wrong body format"); 
  }

  const newFilm = body as NewFilm; //avoir ts NewFilm, mettre dans l'import NewFilm 

  const nextId =
    defaultFilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1; //pas compris 

  const addedFilm: Film = { id: nextId, ...newFilm }; //okk???

  defaultFilms.push(addedFilm);

  return res.json(addedFilm);

})

router.get("/", (_req, res) => {
    return res.json(defaultFilms);
  });
  
  export default router;
