let mysql = require('mysql');
let async = require('async');

// let pool = mysql.createPool({
//   host: 'host',
//   user: 'root',
//   password: 'clz05062746',
//   database: 'cAuth'
// })
let knex;

function DB(){

  this.connect = function() {
    knex = require('knex')({
      client: 'mysql',
      connection: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'clz05062746',
          database: 'cauth',
          charset: 'utf8mb4'
      }
    })
  }

  this.close = function() {
    knex.destroy();
  }

  /**
   * 插入书籍
   * @param  {[type]} booklist  [封装好的书籍对象 类似{title: 'Slaughterhouse Five'}]
   * @return {[type]} bookId    [插入到数据库形成的bookId]
   */
  this.insertBook = function(booklist) {
    return knex('booklist').insert(booklist).returning('bookId')
          .then((bookId) => {
              return bookId;
          }).catch(err => {
             throw err
          })
  }

  /**
   * 根据条件得到对应的书籍
   * @param  {[type]} condition [对象键值对的方式]
   * @return {[type]} book      [description]
   */
  this.getBook = function(condition) {
    return knex('booklist').where(condition).select()
           .then((Book)=> {
             return Book;
           })
  }

 /**
  * 插入章节内容
  * @param  {[type]} section [封装好的章节对象]
  * @return {[type]}         [description]
  */
  this.insertSection = function(section) {
    return knex('bookcontent').insert(section)
           .then((sectionId) => {
              return knex('bookcontent').select('sectionId', 'sectionTitle').where('sectionId', '>=', sectionId)
           }).then((items)=> {
              let sectIds = [];
              let sectTitles = [];
              items=JSON.parse(JSON.stringify(items));
              items.forEach((item,index)=>{
                sectIds[index] = item['sectionId'];
                sectTitles[index] = item['sectionTitle'];
              });
              console.log(sectIds)
              console.log(sectTitles);
              return {'sectIds': sectIds, 'sectTitles': sectTitles};
           })
  }

  /**
   * 根据条件得到对应的章节内容
   * @param  {[type]} condition [description]
   * @return {[type]}           [description]
   */
  this.getSection = function(condition) {
    return knex('bookcontent').where(condition).select()
           .then((section) => {
              return section
           })
  }

}

module.exports = DB;
