<template>
    <div class="comment-item"> 
	    <div class="comment-info">
	        <img class='userinfo-avatar' :src="CommentItem.avatarUrl" background-size="cover">
	        <span class="userinfo-nickname">
				{{ CommentItem.nickName }}
				</span>
			<span class="star">
				<i-rate count="5" size="18" :value="CommentItem.star" i-class="star"></i-rate>
			</span>
	        <span class="comment-time ">{{CommentItem.submitTime}}</span>
	    </div>
	    <p class="comment-content">
	        <span class="short" style="display: inline;">
	        	{{CommentItem.content}}
	        </span>
	    </p>
    </div>
</template>
<script>
// vue-tiny-rate
export default {
  props: ['CommentItem', ''],
  computed: {
  },
  methods: {
  }
}
</script>

<style>
.comment-item {
    background-color: #fff;
	  overflow: hidden;
    line-height: 1.5;
    color: #494949;
    word-wrap: break-word;
    margin-bottom: 10px;
}

.comment-info {
    font-size: 13px;
    color: #494949;
    margin-bottom: 5px;
    height: 30px;
    line-height: 30px;
}
.userinfo-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: left;
  margin-right: 5px;
}
.userinfo-nickname {
  font-size: 30rpx;
  height:30px;
  line-height: 30px;
  color: #007AFF;
  background-color: white;
  float: left;
  margin-right: 5px;
}
.comment-time {
  font-size: 30rpx;
  float: left;
  margin-right: 5px;
}
.star {
  height: 30px;
  line-height: 30px;
  float: right;
  vertical-align:none;
}
.comment-content {
  font-size: 18px;
}


</style>


