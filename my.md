关于图书信息内容的表信息结构

//定义存储小说的schema
var factionListSchema = new mongoose.Schema({
  // _id:{type: Schema.Types.ObjectId},  //主键
  // _fk:Schema.Types.ObjectId,  //外键
  factionName: {
    type: String,
    trim: true, //去除两边的空格
    unique: true
  },  //小说名
  des: String, //小说说明
  headerImage: String, //小说首图链接
  author: String, //小说作者
  sectionArray: [{type: Schema.Types.ObjectId, ref: 'factionContent'}], //小说章节列表, 每个元素是包含章节数、标题、章节内容的JSON
  updateTime: Date, // time of update
  newest: Number, // the newest section number
  comments: [] // all comments of this book
}, {safe: {j: 1, w: 1, wtimeout: 10000}}); //new Schema(config,options); j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒


//定义存储小说内容的schema
var factionContentSchema = new mongoose.Schema({
  sectionNum: {
    type: Number
  },
  sectionTitle: String,
  sectionContent: String,
  sectionResource: String,//小说来源
  recentUpdateTime: Date,  //最新的更新时间，用来比对最新文章
  des: String //add some signature used to management,
}, {safe: {j: 1, w: 1, wtimeout: 10000}});
