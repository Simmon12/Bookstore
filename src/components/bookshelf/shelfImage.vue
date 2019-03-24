<template>
  <div class="book-img-wrapper" :class="{'add-book': item.type == 3}">
    <img class="book-img" :src="item.bookImage" v-if="item.type == 1 || item.type == 2">
    <span class="icon-add iconfont" v-else></span>
    <!-- <span class="icon-selected" style="font-size:12px;" >ss</span> -->
    <div  class="icon-selected" v-show="ifShowCircle" >
      <span class="icon-xuanzhong1 iconfont" :class="ifSelected"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['item', 'ifEdit'],
    computed: {
      ifSelected() {
        if (this.item.isSelected) {
          console.log('selected');
          return 'selected';
        } else {
          console.log('meisel');
          return '';
        }
      },
      ifShowCircle() {
        if (this.ifEdit && this.item.type == 2) {
          return true;
        } 
        return false;
      }
    }
  }
</script>

<style>

.book-img-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  box-shadow: 1px 1px 3px 1 px rgba(200, 200, 200, .3);
  border:　1px solid #eee;
  box-sizing: border-box;
}
.add-book {
  box-shadow: none;
  border: 1px dashed #ccc;
  box-sizing: border-box;
}
.book-img {
  width: 100%;
  height: 100%;
}
.icon-add {
  font-size: 50px;
  color: #ccc;
}
.selected {
  background: red;
}



 
</style>
