import { Router } from "express";
import {  NewFilm } from "../types";
import {
  readAllFilms,
  readOneFilm,
  createNewFilm,
  deleteOneFilm,
  updateFilm,
  updateOrCreateFilm,
} from "../services/films";

const router = Router();

//afficher les films selon la duree min, s'il y'a ce parametre  //apres il y'a dans REST des trucs qui permettent de faire des test avec ça
router.get("/", (req, res) => {
  const minimumDuration = Number(req.query["minimum-duration"]);
  const films = readAllFilms(minimumDuration);
  return res.json(films);
});

//afficher les films selon l'id(dans l'url )
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = readOneFilm(id);
  if (!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

router.post("/", (req, res) => {
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

  const films = createNewFilm(newFilm);
  return res.json(films);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteOneFilm(id);
  if (!deletedFilm) {
    return res.sendStatus(404);
  }
  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
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
  const updatedFilm = updateFilm(id, body);

  if (!updatedFilm) {
    return res.sendStatus(404);
  }

  return res.send(updatedFilm);
});

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

  const createdOrUpdatedFilm = updateOrCreateFilm(id, body as NewFilm);

  if (!createdOrUpdatedFilm) {
    return res.sendStatus(409); 
  }

  return res.send(createdOrUpdatedFilm);
});

export default router;
