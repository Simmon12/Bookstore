const db = require('../../model/db.js');
const Redis = require('../../redis/redis.js')


exports.getBookDetail =  async(ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const bookId = ctx.params.bookId;
    let book;
    let redisKey = `book${bookId}`;
    let has = await Redis.exists(redisKey);
    if(has) {
      console.log('getBookDetail有缓存')
      book = await Redis.get(redisKey);
    } else {
      console.log('getBookDetail无缓存')
      book = await db.getBookDetail(bookId);
      let res = await Redis.set(redisKey, JSON.stringify(book), 7200)
    }
    ctx.state.data = book;
  } else {
    ctx.state.code = -1;
  }

}

exports.getContentById = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const sectionId = ctx.params.sectionId;
    let section;
    let redisKey = `section${sectionId}`;
    let has = await Redis.exists(redisKey);
    if(has) {
      console.log('getContentById有缓存')
      section = await Redis.get(redisKey);
    } else {
      console.log('getContentById无缓存')
      section = await db.getContentById(sectionId);
      let res = await Redis.set(redisKey, JSON.stringify(section), 7200)
    }
    ctx.state.data = section;

  } else {
    ctx.state.code = -1;
  }
}

exports.getBooksByBookName = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const bookName = ctx.params.bookName;
    ctx.state.data = await db.getBooksByBookName(bookName);
  } else {
    ctx.state.code = -1;
  }
}



// exports.getAllSections = async(ctx, next) => {
//   const bookId = ctx.params.bookId;
//   const bookRes = await db.getBookDetail(bookId);
//   const book = bookRes.book[0];
//   console.log('lizz');


//   sectionArray = book.sectionArray.split(",");

//   let sectionIds = sectionArray.map(function (item, index) {
//     return {'sectionId': item}
//   })
//   console.log(sectionIds);
//   ctx.sate.data = await db.getContentById(sectionIds);
// }
