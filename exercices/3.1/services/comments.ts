import { Comment } from "../types";
import path from "path";
import { parse, serialize } from "../utils/json";
import { readOne } from "./films";



const jsonDbPath = path.join(__dirname, "/../data/comments.json");

const readComments = (filmId: number | undefined = undefined): Comment[] => {
    const comments: Comment[] = parse(jsonDbPath, []);
    
    return filmId
    ? comments.filter((comment) => comment.filmId === filmId)
    : comments;
}

const createComment = (newComment: Comment): Comment | undefined => {
    const comments: Comment[] = parse(jsonDbPath, []);

    const filmExists = readOne(newComment.filmId); 
    if (!filmExists) {
        throw new Error("Film does not exist");
    }
    const userHasCommented = comments.some(exists);
    function exists(comment: Comment) {
        return comment.filmId === newComment.filmId && comment.username === newComment.username;
    }
    if (userHasCommented) {
        throw new Error("User has already commented on this film");
    }

    comments.push(newComment); 
    serialize(jsonDbPath, comments);
    return newComment;
    
}; 

const deleteComment = (filmId: number, username: string): void => {
    const comments: Comment[] = parse(jsonDbPath, []);

    const index = comments.findIndex((comment) => comment.filmId === filmId && comment.username === username);
    if (index === -1) {
        throw new Error("Comment not found");
    }

    comments.splice(index, 1);
    serialize(jsonDbPath, comments);
    
}

export { readComments, createComment, deleteComment };
