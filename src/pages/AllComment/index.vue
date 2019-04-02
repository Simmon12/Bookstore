<template>
  <div class="all-comment-wrapper">
  	<div class="comment-item-wrapper" v-for="(CommentItem, index) in comments" :key="index">
  		<comment :CommentItem="CommentItem"></comment>
  	</div>
  </div>
</template>

<script type="ecmascript-6">
import config from '@/config'
import {get} from '@/util/util'
import comment from '@/components/comment/comment'
export default {
	data() {
		return {
			comments: [
		        {
		          'avatarUrl': 'https://wx.qlogo.cn/mmopen/vi_32/GsSvP5O8zAIssIXtbg71eUA8HHxDaHyM9Mg1HgzzFDP7tQlvobiaDf9DE2ictyRmBGq9Wia4icAKPK07NZKGibPejibw/132',
		          'star': 4,
		          'submitTime': '2019-3-25',
		          'content': '好哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
		          'nickName': '蔡丽芝'
		        },
		        {
		          'avatarUrl': 'https://wx.qlogo.cn/mmopen/vi_32/GsSvP5O8zAIssIXtbg71eUA8HHxDaHyM9Mg1HgzzFDP7tQlvobiaDf9DE2ictyRmBGq9Wia4icAKPK07NZKGibPejibw/132',
		          'star': 4,
		          'submitTime': '2019-3-25',
		          'content': '好哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
		          'nickName': '蔡丽芝'
		        },
		        {
		          'avatarUrl': 'https://wx.qlogo.cn/mmopen/vi_32/GsSvP5O8zAIssIXtbg71eUA8HHxDaHyM9Mg1HgzzFDP7tQlvobiaDf9DE2ictyRmBGq9Wia4icAKPK07NZKGibPejibw/132',
		          'star': 4,
		          'submitTime': '2019-3-25',
		          'content': '好哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
		          'nickName': '蔡丽芝'
		        },
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
	  get(config.getCommentsByBookId(bookId)).then((commentsRes)=> {
	      that.comments = commentsRes.comments.map((item, index) => {
	          let time = new Date(item.submitTime);
	          let y = time.getFullYear();
	          var m = time.getMonth()+1;
	          var d = time.getDate();
	          item.submitTime = `${y}-${m}-${d}`;
	          return item;
	      })
	  
	    })
	},

	components: {
     comment
    }

}
</script>

<style rel="stylesheet">
page {
	height: 100%;
	background: #e9eaec;
	margin: 20px 0;

}
.comment-item-wrapper {
	background: #fff;
	padding: 10px;
	margin: 15px 0;
}

</style>
