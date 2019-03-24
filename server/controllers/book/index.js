const db = require('../../model/db.js');


exports.getBookDetail = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    console.log(ctx.state.$wxInfo);
    const bookId = ctx.params.bookId;
    ctx.state.data = await db.getBookDetail(bookId);
  } else {
    ctx.state.code = -1;
  }

}

exports.getContentById = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const sectionId = ctx.params.sectionId;
    ctx.state.data = await db.getContentById(sectionId);
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
