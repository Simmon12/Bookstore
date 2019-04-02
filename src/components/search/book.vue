<template>
  <div @click='onTap' class="container">
    <img :src='book.bookImage'></img>
    <div class='description'>
      <text class='title'>{{book.bookName}}</text>
      <text class='author'>{{book.author}}</text>
    </div>
  </div>
</template>

<script>
export default {
  props: ['book'],
	methods: {
    onTap(event) {
      const bid = this.book.bookId;
      wx.navigateTo({
        url: `/pages/bookDetail/main?bookId=${bid}`,
      })
    }
	}
}

</script>

<style rel="stylesheet" scoped>

.container {
  margin-top: 30rpx;
  display: flex;
  position: relative;
  box-shadow: 2px 2px 3px #e3e3e3;
  flex-direction: column;
  width:240rpx;
  height: 360rpx;
}

.container image {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.description {
  width: 216rpx;
  position: absolute;
  bottom: 0;
  background:#fff;
  padding: 5rpx 10rpx 8rpx 15rpx;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}

.title {
  margin-top: 10rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.author {
  font-size: 20rpx;
  color: #999;   
  margin-bottom: 10rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

</style>
