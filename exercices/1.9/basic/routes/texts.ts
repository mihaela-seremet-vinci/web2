import { Router } from "express";
import {  NewText } from "../types";


import {
  readAll,
  readOne,
  createNew,
  deleteOne,
  update,
} from "../services/texts";

const router = Router();

const expectedLevels = ["easy", "medium", "hard"];


//afficher les films selon la duree min, s'il y'a ce parametre  //apres il y'a dans REST des trucs qui permettent de faire des test avec ça
router.get("/", (req, res) => {
  const level =
    "level" in req.query && typeof req.query["level"] === "string"
      ? req.query["level"] : undefined;

  if (level !== undefined && !expectedLevels.includes(level)) {
    return res.sendStatus(400);
  }
  const texts = readAll(level);
  return res.send(texts);
});

//afficher les films selon l'id(dans l'url )
router.get("/:id", (req, res) => {
  if (typeof req.params.id !== "string") {
    return res.sendStatus(400);
  }
  const text = readOne(req.params.id);
  if (text === undefined) {
    return res.sendStatus(404);
  }

  return res.send(text)
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    typeof body.level !== "string" ||
    !body.content.trim() ||
    !expectedLevels.includes(body.level)
  ) {
    return res.sendStatus(400);
  }

  const newText = body as NewText;
  const createdText = createNew(newText);

  if (!createdText) {
    return res.sendStatus(409);
  }

  return res.json(createdText);
});

router.delete("/:id", (req, res) => {
  const id = String(req.params.id);
  const deletedText = deleteOne(id);
  if (!deletedText) {
    return res.sendStatus(404);
  }
  return res.json(deletedText);
});



router.put("/:id", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    typeof body.level !== "string" ||
    !body.content.trim() ||
    !expectedLevels.includes(body.level)
  ) {
    return res.sendStatus(400);
  }

  const id = String(req.params.id);

  if (typeof id !== 'string') {
    return res.sendStatus(400);
  }

  const updatedText = update(id, body as NewText);

  if (!updatedText) {
    return res.sendStatus(404);
  }

  return res.send(updatedText);
});

export default router;
