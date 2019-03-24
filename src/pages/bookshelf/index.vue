<template>
  <div class="bookshelf-container" @longpress="jumptoEdit" >
    <div class="book-shelf-title" v-show="ifEdit">
      <i-row>
        <i-col span="8" i-class="col-item" @click="clearAll">全选</i-col>
        <i-col span="8" i-class="col-item">请选择</i-col>
        <i-col span="8" i-class="col-item" @click="finish">
          <span style="color: red">完成</span>
        </i-col>
      </i-row>
    </div>
    <scroll-view class="book-shelf-scroll-wrapper">
      <shelf :bookshelfItems="bookshelfItems" :ifEdit="ifEdit" @test="test"></shelf>
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

  created() {
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

</style>
