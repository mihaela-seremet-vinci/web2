import path from "node:path"; //
import { parse, serialize } from "../utils/json"; //
const jsonDbPath = path.join(__dirname, "/../data/films.json"); //
import { Film, NewFilm } from "../types";

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    duration: 142,
    imageUrl: "xx",
    budget: 25,
  },
  {
    id: 2,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    duration: 142,
    imageUrl: "xx",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
  },
  {
    id: 3,
    title: "Fight Club",
    director: "David Fincher",
    duration: 139,
    imageUrl: "xx",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    budget: 63,
  },
];

function readAllFilms(minimumDuration: number): Film[] {
  const films = parse(jsonDbPath, defaultFilms);
  if (minimumDuration === undefined) {
    return films;
  }
  const minDuration = Number(minimumDuration);

  const filteredFilms = films.filter((film) => {
    return film.duration >= minDuration;
  });
  return filteredFilms;
}

function readOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if (!film) {
    undefined;
  }
  return film;
}

function createNewFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);
  const nextId =
    defaultFilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1; //pas compris

  const addedFilm: Film = { id: nextId, ...newFilm }; //okk???
  films.push(addedFilm);
  serialize(jsonDbPath, films);
  return addedFilm;
}

function deleteOneFilm(filmId: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === filmId);
  if (index === -1) {
    return undefined;
  }
  const deletedElements = films.splice(index, 1); // splice() returns an array of the deleted elements
  serialize(jsonDbPath, films);
  return deletedElements[0];
}

//Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés

function updateFilm(
  filmId: number,
  updatedFilm: Partial<NewFilm>
): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === filmId);

  if (index === -1) {
    return undefined;
  }

  const film = { ...films[index], ...updatedFilm };
  films[index] = film;
  serialize(jsonDbPath, films);
  return film;
}


const updateOrCreateFilm = (
    id: number,
    updatedFilm: NewFilm
  ): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
  
    const index = films.findIndex((film) => film.id === id);
  
    if (index === -1) {
      return createNewFilm(updatedFilm);
    }
  
    const film = { ...films[index], ...updatedFilm };
  
    films[index] = film;
    serialize(jsonDbPath, films);
  
    return film;
  };

export { readAllFilms, readOneFilm, createNewFilm, deleteOneFilm, updateFilm, updateOrCreateFilm};