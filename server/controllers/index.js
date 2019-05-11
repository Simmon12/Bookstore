const userController = require('./user');  // 用户登录相关
const bookController = require('./book');
const commentController = require('./comment');


exports.login = userController.login;                       // 登录
exports.getBookDetail = bookController.getBookDetail;
exports.getContentById = bookController.getContentById;
exports.getSectionsBybookId = bookController.getSectionsBybookId;

// exports.getAllSections = bookController.getAllSections;
exports.getBooksByBookName = bookController.getBooksByBookName;
exports.getCommentsByBookId = commentController.getCommentsByBookId;
exports.subComment = commentController.subComment;

