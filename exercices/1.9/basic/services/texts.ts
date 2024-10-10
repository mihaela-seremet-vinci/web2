import path from "node:path"; //
import { Text, NewText } from "../types";


import { parse, serialize } from "../utils/json"; //
const jsonDbPath = path.join(__dirname, "/../data/texts.json"); //

import { v4 as uuidv4 } from 'uuid';




const defaultTexts: Text[] = [
  {
    id: "967979ee-4c4b-4f93-920b-115976fa4abb",
    content: "Hello, world!",
    level: "easy",
  },
  {
    id: "98c72e0e-db05-442a-b035-061f56f7e7f8",
    content: "This is a text.",
    level: "medium",
  },
  {
    id: "45a3397c-d9bd-440b-8099-4346a38d1428",
    content: "This is a longer text.",
    level: "hard",
  },
];

function readAll(level: string | undefined): Text[] {
  const texts = parse(jsonDbPath, defaultTexts);
  if (level === undefined) {
    return texts;
  
  }
  const filteredTexts = texts.filter((text) => {
    return text.level===level;
  });
  return filteredTexts;
}


function readOne(id: string):Text | undefined {
  const text = parse(jsonDbPath, defaultTexts);
  return text.find((text) => text.id === id);
}

function createNew(newText: NewText): Text{

  const texts = parse(jsonDbPath, defaultTexts);
  const nextId = uuidv4(); 

  const addedText = { id: nextId, ...newText }; 
  texts.push(addedText);
  serialize(jsonDbPath, texts);
  return addedText;
}

function deleteOne(textId: String): Text | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  const index = texts.findIndex((text) => text.id === textId);
  if (index === -1) {
    return undefined;
  }
  const deletedElements = texts.splice(index, 1); // splice() returns an array of the deleted elements
  serialize(jsonDbPath, texts);
  return deletedElements[0];
}

//Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés

function update(
  textId: String, updatedText: Partial<NewText> ): Text | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  const index = texts.findIndex((text) => text.id === textId);

  if (index === -1) {
    return undefined;
  }

  const text = { ...texts[index], ...updatedText };
  texts[index] = text;
  serialize(jsonDbPath, texts);
  return text;
}




export { readAll, readOne, createNew, deleteOne, update};