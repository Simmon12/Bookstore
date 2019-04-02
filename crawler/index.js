let crawler = require('./crawler');
let async = require('async');
let DB = require('./DB.js');


  // 20_20597
let url = 'https://www.biquyun.com/20_20689/';
const db = new DB();
let Sections = {};
let SectionIds = [];
let SectionTitles = [];
let Booklist = {};
let BookId;

async.series([
    // 爬虫获取书籍信息对象列表
    function(done) {
      crawler.bookcrawler(url, function(err, sections, booklist) {
        Sections = sections;
        Booklist = booklist;
        // console.log(Sections);
        done(err);
      })
    },

    // 连接数据库
    function(done) {
      db.connect();
      done(null)
    },

    //将获取到的章节信息存入数据库中
    function(done) {
      db.insertSection(Sections).then((res) => {
        SectionIds = res.sectIds;
        SectionTitles = res.sectTitles;
        done(null);
      });
    },

    function(done) {
      // SectionIds.join(",") 数组转化为字符串，以逗号的形式连接
      //SectionIds.split(","); 字符串转化为数组
      Booklist.sectionArray = SectionIds.join(",");
      Booklist.sectionTitles = SectionTitles.join("#");
      db.insertBook(Booklist).then((bookId) => {
        BookId = bookId;
        done(null);
      });
    },

    function(done) {
      db.close();
    },

  ], function(err) {
    if (err) {
      console.log('cuowuw');
      console.log(err);
    }
    else {
      console.log('爬虫完成, 并成功存入数据库中')
    }

  })





// var write = function(bookname,data){

//     var start = new Date();
//     console.log("开始写入文件");
//     fs.writeFileSync(bookname,data,'utf-8');
//     var end = ( new Date() - start ) / 1000;
//     console.log(`写入文件成功,耗时${end}秒`);
// }
