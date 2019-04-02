const db = require('../../model/db.js');

exports.getCommentsByBookId = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    console.log(ctx.state.$wxInfo);
    const bookId = ctx.params.bookId;
    ctx.state.data = await db.getCommentsByBookId(bookId);
  } else {
    ctx.state.code = -1;
  }

}

exports.subComment = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const comment = ctx.request.body;
    ctx.state.data = await db.insertComment(comment);
    console.log(ctx.state.data)
  } else {
    ctx.state.code = -1;
  }
}


