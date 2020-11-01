import { Express } from 'express';
import {CommentController} from '../controllers/comment.controller';

export function CommentRouteNoauthenticate(url:string, app:Express){
    const cmt = new CommentController();
    app.route(`${url}/createComment`).post(cmt.createComment);
    app.route(`${url}/getCommentByDishId/:dishId`).get(cmt.getCommentByDishId);
}