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
  }
}

export default config
