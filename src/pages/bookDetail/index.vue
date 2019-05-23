<template>
  <div class="book-detail-wrapper">
  	<i-row i-class="book-detail-container">
  		<i-col span="9" i-class="book-img-wrapper">
  			<img class="book-img" :src="book.bookImage">
  		</i-col>
  		<i-col span="15" i-class="book-detail">
  			<h3 class="bookName">{{book.bookName}}</h3>
  			<p class="author">{{book.author}}</p>
        <div class="brief-wrapper" @click="showBriefDetail">
          <span><i-icon type="enter" size="14" color="#555" :class="{'ifBreifDetailStyle': ifBreifDetail}" /></span>
          <div class="brief" >
            <p :class="{'ifBreifDetailStyle': ifBreifDetail}">{{book.bookDes}}</p>
          </div>
        </div>
  		</i-col>
  	</i-row>

      <i-row i-class="rating-star">
    <i-col span="12" style="height: 30px; line-height: 30px; font-size: 14px; color: #555">轻点评分</i-col>
    <i-col span="12">
      <i-rate 
        count="5"  size="25"
        @change="onChangeStar" 
        :value="star" style="color: blue">
      </i-rate>
    </i-col>
  </i-row>
    <div class="sub_comment-wrapper" v-show="show_submit_comment">
       <input  type="text" adjust-position :placeholder="placeholderText" class="rating-content" @blur="bindcomment"></input>
       <i-button @click="submitRating" type="primary">发表评论</i-button>
    </div>

    <div class="comment_content_wrapper">
      <h3 class="comment-title">{{book.bookName}}的短评------(全部{{ commentsLength }} 条)</h3>
      <div class="comment-content" v-for="(CommentItem, index) in comments" :key="index">
        <comment :CommentItem="CommentItem"></comment>
      </div>
      <i-divider color="#2d8cf0" lineColor="#2d8cf0" @click="moreComments">更多评论</i-divider>
    </div>




    <i-modal title="简介" :visible="ifBreifDetail" :show-cancel="false" @ok="handleClose" i-class="briefDetail-wrapper">
      <text class="detail"> {{book.bookDes}}</text>
    </i-modal>

    <div class="bottom-bar">
      <i-row i-class="options">
        <i-col span="12" i-class="options-items"  @click="jumptoIndex">
          返回首页
        </i-col>
        <i-col span="12" i-class="options-items2" @click="startRead">开始阅读</i-col>
      </i-row>
    </div>
  </div>

</template>

<script>
import config from '@/config'
import {get} from '@/util/util'
import {post} from '@/util/util'
import comment from '@/components/comment/comment'
export default {
	data() {
		return {
			book: {},
      ifBreifDetail: false,
      star: 0,
      show_submit_comment: false,
      rating_content: '',
      commentsLength: 0,
      comments: [
        {
          'avatarUrl': 'https://wx.qlogo.cn/mmopen/vi_32/GsSvP5O8zAIssIXtbg71eUA8HHxDaHyM9Mg1HgzzFDP7tQlvobiaDf9DE2ictyRmBGq9Wia4icAKPK07NZKGibPejibw/132',
          'star': 4,
          'submitTime': '2019-3-25',
          'content': '好哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          'nickName': '蔡丽芝'
        }
      ]
		}
	},
	mounted() {
		let that = this;
		const bookId = that.$root.$mp.query.bookId;
    get(config.getBookDetail(bookId)).then((bookRes) => {
    	that.book = bookRes.book[0];
    })
    get(config.getCommentsByBookId(bookId)).then((commentsRes)=> {
      that.comments = commentsRes.comments.map((item, index) => {
          let time = new Date(item.submitTime);
          let y = time.getFullYear();
          var m = time.getMonth()+1;
          var d = time.getDate();
          item.submitTime = `${y}-${m}-${d}`;
          return item;
      })
      that.commentsLength = that.comments.length;
    })
    
	},
  methods: {
    bindcomment(e) {
      this.rating_content = e.mp.detail.value;
    },
    showBriefDetail() {
      this.ifBreifDetail = true;
    },
    handleClose() {
      this.ifBreifDetail = false;
    },
    onChangeStar(e) {
      this.star = e.mp.detail.index;
      this.show_submit_comment = true;
    },
    async submitRating() {
      let that = this;
      let userinfo = wx.getStorageSync('userinfo')
      let params = {
        'bookId': that.book.bookId,
        'avatarUrl': userinfo.avatarUrl,
        'star': that.star,
        'content': that.rating_content,
        'nickName':userinfo.nickName
      }
      let res = await post(config.subComment(), params);
      console.log('dads ');
      console.log(that.comments);
      console.log('发表评论');
      console.log(res[0].submitTime);
      console.log('dads ');

      this.show_submit_comment = false;

    },
    moreComments() {
      console.log('更多评论')
      let that = this;
      wx.navigateTo({
          url: `/pages/AllComment/main?bookId=${that.book.bookId}`
      })
    },
    jumptoIndex() {
        wx.switchTab({
          url: '/pages/index/main'
        })
    },
    startRead() {
      let sectionIds = this.book.sectionArray.split(",");
      let bid = this.book.bookId;
          wx.navigateTo({
        url: `/pages/eBookReader/main?bookId=${bid}&sectionId=${sectionIds[0]}`,
      })
    }
  },
  computed: {
    placeholderText() {
      return `点评<<${this.book.bookName}>>`
    }
  },
  components: {
    comment
  }
}

</script>

<style rel="stylesheet">
.book-detail-container, .rating-star ,.comment_content_wrapper{
  margin: 0 20px;
}
.comment_content_wrapper {
  margin-top: 58px;
  padding-bottom: 40px;
}
.book-img-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 145px;
}
.book-img {
  width: 90%;
  height: 100%;
  box-shadow: 1px 1px 3px 1 px rgba(200, 200, 200, .3);
  border:　1px solid #eee;
  box-sizing: border-box;
}
.book-detail {
  position: relative;
	padding-left: 5px;
  height: 145px;
}
.bookName {
  margin-top: 10px;
	font-size: 25px;
	height: 35px;
	line-height: 35px;
	font-weight: normal;
}
.author {
	margin-top: 2px;
	font-size: 12px;
	height: 30px;
	line-height: 30px;
	color: #666;
}
.brief-wrapper {
  position: relative;
  margin-bottom: 10px;
}
.brief {
  font-size: 14px;
  margin-right: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #555;
}
.brief-wrapper span {
  position: absolute;
  top: 11px;
  right: 2px;
}
.ifBreifDetailStyle {
  color: #999;
}
.i-modal-content {
  padding: 20px;
}
.detail {
  text-align: left;
}
.rating-star {
  margin-top: 10px;
}
.rating-content {
  height: 40px;
  margin: 0 15px;
}
.sub_comment-wrapper {
  margin-top: 20px;
}
.comment-title {
  margin: 20px 0;
  color: #007AFF;
}
.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  color: #495060;
  font-size: 16px;
  border-top: 1px solid #dddee1;
  z-index: 10;
}
.bottom-bar .options {
  text-align: center;
  height: 50px;
  letter-spacing: 7px;
  line-height: 50px;
}
.options-items2 {
  color: #fff;
  background: #2d8cf0;
}
.comment-content {
  margin-bottom: 12px;
}
</style>
