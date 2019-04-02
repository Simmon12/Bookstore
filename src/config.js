// 配置项
const host = 'http://localhost:5757/weapp'

const config = {
  host,
  loginUrl: `${host}/login`,
  getBookDetail: function(bookId) {
    return `${host}/getBookDetail/${bookId}`;
  },
  getContentById: function(sectionId) {
    return `${host}/getContentById/${sectionId}`;
  },
  getAllSections: function(bookId) {
    return `${host}/getAllSections/${bookId}`
  },
  getBooksByBookName: function(bookName) {
    return `${host}/getBooksByBookName/${bookName}`
  },
  getBooksByLike: function() {
    return `${host}/getBooksByLike`
  },
  getBooksByFree: function () {
    return `${host}/getBooksByFree`
  },
  getCommentsByBookId: function(bookId) {
    return `${host}/getCommentsByBookId/${bookId}`
  },
  subComment: function() {
    return `${host}/subComment`
  }
}

export default config
