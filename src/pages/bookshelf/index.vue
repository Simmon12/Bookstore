<template>
  <div class="bookshelf-container" @longpress="jumptoEdit" >
    <div class="book-shelf-title" v-show="ifEdit">
      <div>
        <div class="col-class col-item" @click="clearAll">全选</div>
        <div class="col-class col-item">请选择</div>
        <div class="col-class col-item" @click="finish">
          <span style="color: red">完成</span>
        </div>
      </div>
    </div>
<!--     <div class="book-shelf-baner">
      <img class="banner-image" src="/static/images/bookshelf_banner.jpg" background-size="cover">
    </div> -->
    <scroll-view class="book-shelf-scroll-wrapper">
      <shelf :ifEdit="ifEdit" @test="test"></shelf>
    </scroll-view>


  </div>
</template>

<script type="ecmascript-6">
import shelfTitle from '@/components/bookshelf/shelfTitle'
import shelf from '@/components/bookshelf/shelf'

export default {
  data() {
    return {
      bookshelfItems: [],
      ifEdit: false
    }
  },

  onShow() {
    console.log('书架')
    let self = this;
    self.bookshelfItems = wx.getStorageSync('bookshelfItems')
  },

  methods: {
    jumptoEdit() {
      this.ifEdit = true;
    },
    finish() {
      this.ifEdit = false;
    },
    test() {
      console.log('zujiandsf');
      console.log(this.bookshelfItems);
    }
  },

  components: {
    shelfTitle,
    shelf
  }
}
</script>

<style rel="stylesheet">
.book-shelf-title {
  position: fixed;
  top: 0;
  width: 100%;
  height:30px;
  line-height: 30px;
  z-index: 20;
  background: #fff;
  padding: 0 10px;
  font-size: 15px;
  color: #444;
}
.col-item {
  text-align: center;
}
.book-shelf-baner {
  width: 100%;
  height: 342rpx;
  margin: 0 15px;
  margin-top: 55px; 
  margin-bottom: 28px;
}
.banner-image {
  width: 91%;
  height: 100%;
  border-radius: 15px;
}
.book-shelf-scroll-wrapper {
  margin-top: 34px;
}
.col-class {
  height: 52px;
  display: inline-block;
  width: 32%;
  text-align: center;
  margin: 0 auto;
  text-align: center;
}
</style>
