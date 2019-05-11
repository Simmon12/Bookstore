/**
 * db数据库操作
 */
const { mysql } = require('../qcloud');

/**
 * [getBookDetail 根据id获取book的详细信息]
 * @param  {[type]} bookId [description]
 * @return {[type]}        [description]
 */
function getBookDetail (bookId){
  return mysql('booklist').where('bookId', bookId)
          .select()
          .then((book) => {
              return {book: book};
          })
}

/**
 * [getContentById 根据id获取章节内容]
 * @param  {[type]} sectionId [description]
 * @return {[type]}           [description]
 */
function getContentById(sectionId) {
  return mysql('bookcontent').where('sectionId', sectionId)
          .select()
          .then((section) => {
            return {section: section}
          })
}


function getBooksByBookName(bookName) {
  return mysql('booklist').where('bookName', 'like', `%${bookName}%`)
          .select()
          .then((books) => {
            return {books: books}
          })
}

function getCommentsByBookId(bookId) {
  return mysql('comment').where('bookId',bookId)
        .select()
        .then((comments) => {
          return {'comments': comments}
        })
}

function insertComment(comment) {
  return mysql('comment').insert(comment).returning(['commentId','submitTime'])
        .then((commentId, submitTime) => {
           return mysql('comment').column('submitTime').where('commentId', commentId).select()
              .then((submitTime) => {
                 return submitTime;
              })
        })
}

function getSectionsBybookId(bookId) {
  return mysql('booklist').where('bookId', bookId)
          .column('sectionTitles','sectionArray' )
          .select()
          .then((res) => {
              let sectionTitles = res[0].sectionTitles.split("#");
              let sectionIds = res[0].sectionArray.split(",");
              let sectionLists = sectionIds.map(function (item, index) {
                return {'sectionId': item, 'sectionTitle': sectionTitles[index]};
              })
              return sectionLists;
          })
}

module.exports = {
  getBookDetail,
  getContentById,
  getBooksByBookName,
  getCommentsByBookId,
  insertComment,
  getSectionsBybookId
}
