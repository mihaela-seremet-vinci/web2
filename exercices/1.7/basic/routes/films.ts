import {Router} from "express"; 
import { Film, NewFilm } from "../types";

import path from "node:path"; //
import { parse, serialize } from "../utils/json"; //
const jsonDbPath = path.join(__dirname, "/../data/films.json"); //

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
  const films = parse(jsonDbPath, defaultFilms); 
  if (req.query["minimum-duration"] === undefined) {
    return res.json(films);
    
  }
  const minDuration = Number(req.query["minimum-duration"]);

  if (isNaN(minDuration) || minDuration <= 0) {
    //res.json("Wrong minimum duration"); 
    res.sendStatus(400); 
  }

  const filteredFilms = films.filter((film) => {
    return film.duration >= minDuration;
});

  return res.json(filteredFilms);
}); 

//afficher les films selon l'id(dans l'url )
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms); 
  const  film = films.find((film) => film.id === id);
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
    return res.sendStatus(400); 
  }

  const newFilm = body as NewFilm; //avoir ts NewFilm, mettre dans l'import NewFilm 
  
const films = parse(jsonDbPath, defaultFilms); 

  const nextId =
  defaultFilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1; //pas compris 

  const addedFilm: Film = { id: nextId, ...newFilm }; //okk???

  films.push(addedFilm);
  serialize(jsonDbPath, films); 
  return res.json(addedFilm);

})

//supprimer un film identifie avec son id

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms); 
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const deletedElements = films.splice(index, 1); // splice() returns an array of the deleted elements
  serialize(jsonDbPath, films); 
  return res.json(deletedElements[0]);
});


//Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms); 
  if (isNaN(id)) {
    return res.sendStatus(400);
  }
  const filmToUpdate = films.find((film) => film.id === id);
  if (filmToUpdate === undefined) {
    return res.sendStatus(404);
  }
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    Object.keys(body).length === 0 ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  const updatedFilm = { ...filmToUpdate, ...body };

  films [films.indexOf(filmToUpdate)] = updatedFilm;
  serialize(jsonDbPath, films); 
  return res.send(updatedFilm);
});

 // Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put("/:id", (req, res) => {
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
    return res.sendStatus(400);
  }
  
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);
  const indexOfFilmToUpdate = films.findIndex((film) => film.id === id);
  if (indexOfFilmToUpdate < 0) {
    const newFilm = body as NewFilm;

  const nextId =
    films.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;
    const addedFilm = { id: nextId, ...newFilm };
    films.push(addedFilm);

    serialize(jsonDbPath, films);
    return res.json(addedFilm);
  }

  
  const updatedFilm = { ...films[indexOfFilmToUpdate], ...body } as Film;

  films[indexOfFilmToUpdate] = updatedFilm;
  serialize(jsonDbPath, films); 
  return res.send(updatedFilm);
});



  export default router;
