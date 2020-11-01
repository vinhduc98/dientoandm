"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRouteNoauthenticate = void 0;
const comment_controller_1 = require("../controllers/comment.controller");
function CommentRouteNoauthenticate(url, app) {
    const cmt = new comment_controller_1.CommentController();
    app.route(`${url}/createComment`).post(cmt.createComment);
    app.route(`${url}/getCommentByDishId/:dishId`).get(cmt.getCommentByDishId);
}
exports.CommentRouteNoauthenticate = CommentRouteNoauthenticate;
//# sourceMappingURL=comment.route.js.map