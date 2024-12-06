import { Router } from 'express';

const router = Router();

import { readComments, createComment, deleteComment } from '../services/comments';
import '../types'; // Import the extended types
import { Comment } from '../types';
import { authorize } from '../utils/auths';

router.get('/', (_req, res) => {   
    const idFilm = "filmId" in _req.query
    ? Number(_req.query.filmId)
    : undefined;

    const comments = readComments(idFilm);
    res.send(comments);
}); 

router.post('/', authorize, (req, res) => {
    const body = req.body ;

    if (
        !body ||
        typeof body !== "object" ||
        !("comment" in body) ||
        !("filmId" in body) ||
        typeof body.comment !== "string" ||
        typeof body.filmId !== "number" ||
        !Number.isInteger(body.filmId) ||
        body.filmId <= 0 ||
        !body.comment.trim() ||
        !("user" in req) ||
        typeof req.user !== "object" ||
        !req.user ||
        !("username" in req.user) ||
        typeof req.user.username !== "string"
      ) {
        return res.sendStatus(400);
      }

    const newComment: Comment = {
        filmId: body.filmId,
        username: req.user.username,
        comment: body.comment,
      };


    const addedComment = createComment(newComment);
    
    if(!addedComment) {
        return res.sendStatus(409);
    }
    return res.send(addedComment);
});
    
/*router.delete('/:filmId/:username', (req, res) => {
    const filmId = Number(req.params.filmId);
    const username = req.params.username;

    if (isNaN(filmId) || typeof username !== "string") {
        return res.sendStatus(400);
    }

    try {
        deleteComment(filmId, username);
       return res.sendStatus(204);
    } catch (error) {
       return res.sendStatus(404);
    }
    
});*/

router.delete("/films/:filmId", authorize, (req, res) => {
    const filmId = Number(req.params.filmId);
  
    if (
      isNaN(filmId) ||
      filmId <= 0 ||
      !("user" in req) ||
      typeof req.user !== "object" ||
      !req.user ||
      !("username" in req.user) ||
      typeof req.user.username !== "string"
    ) {
      return res.sendStatus(400);
    }
  
    const username = req.user.username;
  
    try {
      const deletedComment = deleteComment(filmId, username);
      return res.send(deletedComment);
    } catch (error) {
      if (!(error instanceof Error)) {
        return res.sendStatus(500);
      }
  
      if (error.message === "Not found") {
        return res.sendStatus(404);
      }
  
      return res.sendStatus(500);
    }
  });

export default router; 