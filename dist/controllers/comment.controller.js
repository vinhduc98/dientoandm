"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const description_1 = require("../description/description");
const sequelize_1 = __importDefault(require("sequelize"));
const defaultimg_config_1 = require("../config/defaultimg.config");
class CommentController {
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            let body = req.body;
            try {
                let createCmt = yield cookingrecipe_1.default.Comment.create({
                    rating: body.rating,
                    comment: body.comment,
                    author: body.author,
                    isMember: body.isMember,
                    dishId: body.dishId,
                    isChildren: body.isChildren
                }, { transaction });
                if (createCmt.getDataValue("id") !== undefined) {
                    let id = createCmt.getDataValue("id");
                    let author = createCmt.getDataValue("author");
                    let findAccount = yield cookingrecipe_1.default.Account.findOne({
                        where: {
                            username: author
                        }
                    });
                    if (createCmt.getDataValue('isMember') === 1) {
                        if (findAccount === null) {
                            return res.status(200).send({
                                status: 0,
                                description: 'Lỗi web! isMember hiện tại set trạng thái thành viên nhưng author không có trong danh sách user'
                            });
                        }
                    }
                    let findDish = yield cookingrecipe_1.default.Dish.findOne({
                        where: {
                            id: body.dishId
                        }
                    });
                    // Thông báo cho account mỗi khi có người comment
                    yield cookingrecipe_1.default.Notify.create({
                        content: `${author} đã bình luận vào 1 dish của bạn`,
                        state: 1,
                        accountId: findDish.getDataValue("accountId")
                    });
                }
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: 'Ok'
                });
            }
            catch (error) {
                if (transaction) {
                    transaction.rollback();
                }
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    getCommentByDishId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dishId = req.params.dishId;
                let comments = [];
                let childComment = [];
                let cmt = [];
                let parentComments = yield cookingrecipe_1.default.Comment.findAll({
                    where: {
                        dishId,
                        isChildren: 0
                    },
                    order: [['updatedAt', 'DESC']]
                });
                for (let i = 0; i < parentComments.length; i++) {
                    let avatar;
                    const acc = yield cookingrecipe_1.default.Account.findOne({
                        where: {
                            username: parentComments[i].author
                        }
                    });
                    if (acc !== null) {
                        avatar = acc.avatar;
                    }
                    else {
                        avatar = defaultimg_config_1.img.iconlogin;
                    }
                    let objectParentComments = {
                        id: parentComments[i].id,
                        rating: parentComments[i].rating,
                        comment: parentComments[i].comment,
                        author: parentComments[i].author,
                        isMember: parentComments[i].isMember,
                        isChildren: parentComments[i].getDataValue("isChildren"),
                        createdAt: parentComments[i].getDataValue("createdAt"),
                        dishId: parentComments[i].getDataValue("dishId"),
                        avatar
                    };
                    comments.push(objectParentComments);
                }
                console.log(comments);
                let childrenComments = yield cookingrecipe_1.default.Comment.findAll({
                    where: {
                        dishId,
                        isChildren: {
                            [sequelize_1.default.Op.gt]: [0]
                        }
                    },
                    order: [['isChildren', 'ASC']]
                });
                for (let j = 0; j < childrenComments.length; j++) {
                    let avatar;
                    const acc = yield cookingrecipe_1.default.Account.findOne({
                        where: {
                            username: childrenComments[j].author
                        }
                    });
                    if (acc !== null) {
                        avatar = acc.avatar;
                    }
                    else {
                        avatar = defaultimg_config_1.img.iconlogin;
                    }
                    let objectChildrenComments = {
                        id: childrenComments[j].id,
                        rating: childrenComments[j].rating,
                        comment: childrenComments[j].comment,
                        author: childrenComments[j].author,
                        isMember: childrenComments[j].isMember,
                        isChildren: childrenComments[j].getDataValue("isChildren"),
                        createdAt: childrenComments[j].getDataValue("createdAt"),
                        dishId: childrenComments[j].getDataValue("dishId"),
                        avatar
                    };
                    childComment.push(objectChildrenComments);
                }
                for (let k = 0; k < comments.length; k++) {
                    if (childComment.length > 0) {
                        for (let h = 0; h < childComment.length; h++) {
                            if (cmt.indexOf(comments[k]) <= -1) {
                                cmt.push(comments[k]);
                            }
                            console.log(cmt);
                            if (comments[k].id === childComment[h].isChildren) {
                                if (cmt.indexOf(childComment[h]) <= -1) {
                                    cmt.push(childComment[h]);
                                }
                            }
                        }
                    }
                    else {
                        cmt.push(comments[k]);
                    }
                }
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    comments: cmt,
                    count: comments.length + 1
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    getCommentByCommentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.commentId;
                let cmts = {};
                let commentChildren = [];
                let comment = yield cookingrecipe_1.default.Comment.findAll({
                    attributes: ['id', 'rating', 'comment', 'author', 'isMember', 'isChildren', 'createdAt'],
                    where: {
                        isChildren: id
                    }
                });
                for (let i = 0; i < comment.length; i++) {
                    let avatar;
                    const acc = yield cookingrecipe_1.default.Account.findOne({
                        where: {
                            username: comment[i].author
                        }
                    });
                    if (acc !== null) {
                        avatar = acc.avatar;
                    }
                    else {
                        avatar = defaultimg_config_1.img.iconlogin;
                    }
                    console.log(avatar);
                    cmts = {
                        id: comment[i].id,
                        rating: comment[i].rating,
                        comment: comment[i].comment,
                        author: comment[i].author,
                        isMember: comment[i].isMember,
                        isChildren: comment[i].getDataValue("isChildren"),
                        createdAt: comment[i].getDataValue("createdAt"),
                        avatar
                    };
                    commentChildren.push(cmts);
                }
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    commentChildren
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map