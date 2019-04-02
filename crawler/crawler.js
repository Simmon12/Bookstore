const request = require('request');
const iconv = require('iconv-lite');   // 用来转码，防止乱码现象
const cheerio = require('cheerio');    // 类似jquery的一个库
// 文件管理模块
const fs = require('fs');
const async = require('async');
var NUMBER = 0;


exports.bookcrawler = function(URL, callback) {
  const startTime = new Date();

  let options = {
    method: 'GET',
    encoding: null,
    url: URL,
    timeout: 100000,
    rejectUnauthorized: false
  };


  request(options, function(err, res, body) {
    if (err) {
      console.log('小说爬取失败:' + err);
      return;
    }
    console.log("首页爬取成功,费时" + (new Date() - startTime) / 1000 + '秒');

    // 开始处理爬到的信息
    body = iconv.decode(body, 'gbk');
    let $ = cheerio.load(body);
    let MAXLIMIT = 1;     // 最大并行数
    let bookName = $('#info>h1').text();
    let bookListUrls = $('#list>dl>dd>a');
    let requestUrls = [];
    let reg = /作\s*者：/;
    let author = $('#info>h1').next().text().replace(reg,'').trim();
    let booklist = {
      'bookName': bookName,
      'bookDes': $('#intro>p').text(),
      'bookImage': $('#fmimg>img').attr('src'),
      'bookType': '青春言情',
      'author': author

    };

    bookListUrls.each(function(index, ele){
      let url = URL.substring(0, 24) + $(this).attr('href');
      let data = {
        'index': index,
        'url': url,
        'title': $(this).text(),
        'bookName': bookName
      };
      requestUrls.push(data);
    });

    async.mapLimit(requestUrls, MAXLIMIT, function(item, fb) {
      getBookContent(item, fb)
    }, function(err, sections) {
        if (err) {
          console.log('最後失敗：' + err)
        }
        var end  = ( new Date() - startTime ) /1000;
        console.log(`爬取所有信息费时${end}秒`);
        sections.sort(function(a,b){
                return a.sectionNum - b.sectionNum;
        });

        callback(null, sections, booklist);
    })

  })
}

function getBookContent(item, callback) {
    let start = new Date();
    let options = {
      method: 'GET',
      encoding: null,
      url: item.url,
      timeout: 100000,
      rejectUnauthorized: false
    };

    request(options,function(err,res,body){
        let end = (new Date() - start) / 1000;
        let str;
        if(err){
            let str = `获取${item.url}失败,共耗时${end}秒\n\r`;
            callback(null,{
                'index':-1,
                'title':'异常',
                'content':'异常'
            });
        }else{
            body = iconv.decode(body,'gbk');
            let $ = cheerio.load(body);
            let content = $('#content').text().replace(/<br><br>/g,'<br/>');
            let str = `获取${item.url}成功,共耗时${end}秒\n\r`;
            let data = {
                "sectionNum":item.index,
                "sectionTitle":item.title,
                "sectionContent":content,
                "bookName": item.bookName
            };
            callback(null,data);
            NUMBER++;
            console.log(`成功获取${NUMBER}个`);
        }
    })
}


