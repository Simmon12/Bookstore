<template>
  <div class="book-shelf-wrapper">
    <div class="book-shelf-list">
      <div class="book-shelf-item" v-for="(item,index) in bookShelfData" :key="index" @click="onBookClick(item)">
        <!-- <div class="book-img-wrapper" :class="{'add-book': item.type == 3}">
          <img class="book-img" :src="item.bookImage" v-if="item.type == 1 || item.type == 2">
          <span class="icon-add iconfont" v-else></span>
          <span class="icon-selected" style="font-size:12px;" >ss</span>
          <div  class="icon-selected" v-show="ifEdit" >
            <span class="icon-xuanzhong1 iconfont" :class="ifSelected(item)"></span>
          </div>
        </div> -->
        <shelfImage :item="item" :ifEdit="ifEdit"></shelfImage>
        <div class="book-title-wrapper">
          <span class="book-title title-small">{{item.bookName}}</span>
        </div>
      </div>
    </div>
    <div class="options-wrapper" v-show="ifEdit">
      <i-row i-class="options">
        <i-col span="12" i-class="options-items" :class="canedit" @click="deleteBook">刪除({{delelteItems.length}})</i-col>
        <i-col span="12" i-class="options-items" :class="canSee">详情</i-col>
      </i-row>
    </div>

  </div>
</template>

<script type="ecmascript-6">
import shelfImage from '@/components/bookshelf/shelfImage'
export default {
  props: ['bookshelfItems', 'ifEdit'],
  data() {
    return {
      bookData: [],
      delelteItems: [],
      ifDelte: false
    }
  },
  created() {
    this.bookData = this.bookshelfItems.map((item, index) => {
        item.type = 1;
        this.$set(item, 'isSelected', false)
        return item;
    });
    this.bookData.push({'type': 3})
  },
  methods: {
    onBookClick(item) {
      if (item.type == 1) {
        let bookId = item.bookId
        let latestReadSec = wx.getStorageSync(`latestRead${bookId}`);
        let sectionId = item.sectionId;
        if (latestReadSec) {
          sectionId = latestReadSec;
        }
        wx.navigateTo({
          url: `/pages/eBookReader/main?bookId=${bookId}&sectionId=${sectionId}`
        })
      } else if (item.type == 2) {
        console.log('编辑状态')
        item.isSelected = !item.isSelected;     
      } 
    },
    deleteBook() {
      console.log('slddd')
      console.log(this.delelteItems);
      let bookLists = wx.getStorageSync('bookshelf');
      let IdPos = -1;
      let ObjPos = -1;
      let that = this;
      this.ifDelte = true;

      if (that.delelteItems.length) {
        this.delelteItems.forEach((item, index) => {
          if (item.isSelected) {
            IdPos = bookLists.findIndex((value) => value == item.bookId);
            ObjPos = that.bookshelfItems.findIndex((Item) => Item.bookId == item.bookId)
            bookLists.splice(IdPos, 1);
            that.bookshelfItems.splice(ObjPos, 1);
            that.bookData.splice(ObjPos, 1);
          }
        })

        wx.setStorage({
            key: "bookshelf",
            data: bookLists
          })
          wx.setStorage({
            key: "bookshelfItems",
            data: that.bookshelfItems
          })
        this.ifEdit = false;
      }
    },
  },

  computed: {
    bookShelfData() {
      if (this.ifEdit) {
        this.bookData.forEach(function (item, index) {
           if (item.type == 1) {
              item.type = 2;
           }
        })
        
      } 
      if (!this.ifEdit) {
        this.bookData.forEach(function (item, index) {
          if (item.type == 2) {
              item.type = 1;
           }
        })
      }
      if(this.ifEdit) {
        return this.bookData;
      }
      console.log(this.bookData)
      return this.bookData
    },
    ifSelected(item) {
      return item.isSelected == true ? 'selected' : false;
    },
    canedit() {
      let delelteItems = this.bookshelfItems.filter((item) => {
        return item.isSelected == true
      })
      this.delelteItems = delelteItems;
      if (delelteItems.length) {
        return 'delelte-none';
      }
      return '';
    }

  },

  watch: {
      ifEdit(newValue, oldValue) {
          console.log(newValue)
          return newValue;
      }
  },

  components: {
    shelfImage  
  }



}

</script>

<style rel="stylesheet">

@font-face {font-family: "iconfont";
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANUAAsAAAAAB4wAAAMHAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqCSII5ATYCJAMQCwoABCAFhG0HRhupBsgekiSQHAcUkKCAeoyEePgaS9/f/XfZELpEAcpMLI+PYkUkHJVUVevqZI2tUCx878f9tDcgzlCV5Qgw0N9ymqH6HbAE1MDCoCY+lnMnT18DMOvzWzimPu0COaC7RBVGNEUCnlsPFNV0sl/kegD+MrzWpXDQhwkMmKPgsl9a3QzeEhkViCeJDYB3xiil7GlCt2Jhiq88tPK5COBL8Pn4B7rwpuhUZOLBTQmG/J+eX0o3uSfr9hCY0+kgL6NiHUjirtJwwS1yrnMzYHZ3twk0TWGqlowv5f8eZhBBNBoaQ/94hejC4UNgA1yVn56ckQgzQCZAqIQwBT7IgoY+nAHfENyU3yuKmjk07h8T4hYGoY9+3gPPb2/N7+8tn59tHx8deGUxsnXNebQU0cLWlw7kGp+ep+a3xdaAymTOtpzuc6ml8qp3ufmtE7euLe7LES2rS1Fs3Xm4uAe1vmXUerGo5l+5l/sVpQLN5SQ7KvIzMjaiN2aXF2JSYjY49w/diElN7Opz4f7uF5Tq0VxOEtNw01wcX5qww6i+r8EQX5xQugNUoMYZKybJFjfXT58WYlNiF7a2NmIoPybpABqA3nUFSX7wDRcE/0//7PYFZf9rfgl+nOMUlNKTk/oevGVmZ+bvYHYsSotNlJkGhzPs8LTJjfviDVA1P8HLhD9TiKY7hxOa6QSKPrNQNfPIxK5Dx6AN6Gq2YMCasuWDJnFuIvuxagZBGHMGxYjvUI25Ryb2N3TM+AtdY+EGAw4jbMNBiyH5FnEyIAhGg+NIGrJaKFML3zCykbBh0wBPswN8K+EOyYK0Kk3eU0YshE8xxTHCdEJQRLnVjErRccRksiIbtxrIkFDphbBlqtW06kWqIasZfO3hiAECgSGDxiGSIVYW1Kss+Bbe34hghpkM4A1pTcpWBOcgtY9oqWg6IMsElk5pt/KMwwhGRxAohOKszJBSpCNM1GmF2Kr7GRBDBBX9ALtNJjUuR7sKVMuLzG+4CgaQ8zNK1MjoqOcY+4wND1gm9FYL8430WgAA') format('woff2');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-add:before {
  content: "\e626";
}

.icon-xuanzhong:before {
  content: "\e62d";
}

.icon-xuanzhong1:before {
  content: "\e606";
}

.icon-xuanzhong1 {
  font-size: 28px;
  color: #fff;
  background:rgba(39,60,125,0.5);
  border-radius: 50%;
}



.book-shelf-wrapper {
  width: 100%;
  overflow: auto;
  font-size: 0;
}
.book-shelf-list {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.book-shelf-item {
  flex: 0 0 33.33%;
  width: 33.33%;
  height: 150px;
  padding: 15px;
  box-sizing: border-box
}


.book-title-wrapper {
  margin-top: 6px;
  text-align: center;
}
.title-small {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #444;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.icon-selected {
  position: absolute;
  bottom: 0;
  right: 0;
}

.options-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #ea6f5a;
  color: #ddd;
  font-size: 16px;
}
.options {
  text-align: center;
  height: 50px;
  letter-spacing: 7px;
  line-height: 50px;
}

.delelte-none {
  color: #fff;
}


</style>
