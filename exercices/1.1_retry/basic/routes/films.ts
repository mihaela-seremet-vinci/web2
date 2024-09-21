import {Router} from "express"; 

import { Film } from "../types";

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
//ezefzefzefv
//zeffzef
router.get("/", (_req, res) => {
    return res.json(defaultFilms);
  });
  
  export default router;
