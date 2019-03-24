const userController = require('./user');  // 用户登录相关
const bookController = require('./book');


exports.login = userController.login;                       // 登录
exports.getBookDetail = bookController.getBookDetail;
exports.getContentById = bookController.getContentById;
// exports.getAllSections = bookController.getAllSections;
