<template>
  <div class="index-wrapper">
    <div class="search-wrapper">
      <div class="search-container" @click="jumpToSearch">
        <i-icon type="search" i-class="search-icon" size="20"/>
        <input placeholder="特种岁月" disabled class="search-input" />
      </div>
    </div>
    <div class="banner-wrapper">
      <img class="banner-image" src="/static/images/banner_people.jpg" background-size="cover">
    </div>

    <div class="recommend-wrapper">
      <div class="title-wrapper">
        <span class="title">猜你喜欢</span>
        <span class="change" @click="changeLike">换一批</span>
      </div>
      <div class="item-container like-container">
        <div class="like-item" v-for="(item, index) in likeItems" :key="index" @click="jumptoBook(item)">
          <img :src="item.bookImage" class="like-image">
          <p class="bookName">{{item.bookName}}</p>
        </div>
      </div>
    </div>

    <div class="free-block">
      <div class="recommend-wrapper">
        <div class="title-wrapper">
          <span class="title">精选阅读</span>
          <span class="change" @click="changeLike">换一批</span>
        </div>
        <div class="item-container">
          <div class="free-item" v-for="(item, index) in freeItems" :key="index" @click="jumptoBook(item)">
            <img :src="item.bookImage" class="free-image">
            <div class="right">
              <p class="bookName">{{item.bookName}}</p>
              <p class="author">{{item.author}}</p>
              <p class="type">{{item.bookType}}</p>
            </div>
            
          </div>
        </div>
      </div>      
    </div>

    <div class="classic-block">
      <div class="recommend-wrapper classic-wrapper">
        <div class="title-wrapper">
          <span class="title">分类</span>
        </div>
        <div class="item-container">
          <div class="classic-item" v-for="(item, index) in classicItems" :key="index" >
            <div class="classic">
              <div class="left">
                <p class="bookType">{{item.bookType}}</p>
                <p class="bookNum">{{item.bookNum}}本书</p>
              </div>
              <img :src="item.image" class="classic-img"/>
            </div>
          </div>
        </div>
      </div>      
    </div>



  </div>

</template>

<script type="ecmascript-6">
export default {
  data() {
    return {
      test: '',
      likeItems: [
        {
          'bookImage': 'http://img.biquyun.com/image/20/20565/20565s.jpg',
          'bookName': '民国草根',
          'author': '二宝天使' ,
          'bookId': 38
        },
        {
          'bookImage': 'http://img.biquyun.com/image/20/20661/20661s.jpg',
          'bookName': '这个魔法世界有点坑',
          'author': '墨羽云山',
          'bookId': 39
        },
        {
          'bookImage': 'http://img.biquyun.com/image/20/20687/20687s.jpg',
          'bookName': '儒道诸天',
          'author': '墨羽云山' ,
          'bookId': 40
        }
      ],
      freeItems: [
        {
          'bookImage': 'http://img.biquyun.com/image/20/20565/20565s.jpg',
          'bookName': '民国草根',
          'author': '二宝天使' ,
          'bookType': '历史',
          'bookId': 38
        },
        {
          'bookImage': 'http://img.biquyun.com/image/20/20661/20661s.jpg',
          'bookName': '这个魔法世界有点坑',
          'author': '墨羽云山', 
          'bookType': '玄幻',
          'bookId': 39
        },
        {
          'bookImage': 'http://img.biquyun.com/image/20/20687/20687s.jpg',
          'bookName': '儒道诸天',
          'author': '墨羽云山',
          'bookType': '历史',
          'bookId': 40
        },
        {
          'bookImage': 'http://img.biquyun.com/image/20/20576/20576s.jpg',
          'bookName': '儒道诸天',
          'author': '墨羽云山' ,
          'bookType': '青春言情',
          'bookId': 38
        }
      ],
      classicItems: [
        {
          'bookType': '青春言情',
          'bookNum': '1324',
          'image': '/static/images/qingchun.jpg' ,
        },
        {
          'bookType': '历史小说',
          'bookNum': '1324',
          'image': '/static/images/qingchun.jpg' ,
        },
        {
          'bookType': '玄幻小说',
          'bookNum': '1324',
          'image': '/static/images/qingchun.jpg' ,
        },
        {
          'bookType': '科幻小说',
          'bookNum': '1324',
          'image': '/static/images/qingchun.jpg' ,
        },
        {
          'bookType': '推理悬疑',
          'bookNum': '1324',
          'image': '/static/images/qingchun.jpg' ,
        },
        {
          'bookType': '女生小说',
          'bookNum': '1324',
          'image': '/static/images/qingchun.jpg' ,
        }
      ],
    }
  },
  mounted() {
    console.log(this.$root.$mp.query)
    this.test = this.$root.$mp.query;
  },
  methods: {
    changeLike() {
      console.log('换喜欢的推进')
    },
    jumpToSearch() {
      wx.navigateTo({
          url: `/pages/search/main`
      })
    },
    jumptoBook(item) {
      const bid = item.bookId;
      wx.navigateTo({
        url: `/pages/bookDetail/main?bookId=${bid}`,
      })
    }
  }
}

</script>

<style rel="stylesheet">
.index-wrapper {
  width: 100%;
}
.search-wrapper {
  position: fixed;
  width: 100%;
  padding: 0 15px;
  top: 0;
  z-index: 10;
  background: #fff;
  height: 50px;
}
.search-container {
  width: 90%;
  height: 40px;
  border-radius: 15px;
  background: #f8f8f9;
}
.search-input {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-left: 35px;
  font-size: 15px;
}
.search-icon {
  position: absolute;
  top: 9px;
  left: 21px;
}

.banner-wrapper {
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


.recommend-wrapper {
  margin: 0 15px;
  margin-bottom: 40px;

}

.title-wrapper {
  margin-bottom: 15px;
}
.change {
  float: right;
  color: #2d8cf0;
  font-size:32rpx;
  margin-top:14rpx;
  margin-right:26rpx;

}

.title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

.item-container {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  box-sizing: border-box;
}
.like-item {
  flex: 0 0 33.33%;
  width: 33.33%;
  padding-right: 19px;
  box-sizing: border-box
}


.like-container .like-image {
  width: 100%;
  height: 140px;
  box-shadow: 1px 1px 3px 1 px rgba(200, 200, 200, .3);
  border:　1px solid #eee;
}
.like-container .bookName {
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  color: #495060;
  margin-bottom: 5px
}
.like-container .author {
  height: 17px;
  line-height: 17px;
  font-size: 12px;
  color: #495060;
}

.free-block {
  padding: 18px 0 1px;
  background: #f8f8f9;
}
.free-item {
  flex: 0 0 50%;
  width: 50%;
  padding-right: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.free-image {
  width:50%;
  height: 115px;
  float: left;
  margin-right: 12px;
  box-shadow: 1px 1px 3px 1 px rgba(200, 200, 200, .3);
  border:　1px solid #eee;
}
.right {
  float: left;
  width: 40%;
  margin-top: 10px;
}

.free-item .bookName {
  font-size:16px;
  word-break:break-all

}
.free-item .author {
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  color: #80848f;
}
.free-item .type {
  font-size: 12px;
  color:#bbbec4;
}

.classic-block {
  padding: 18px 0;
  background: #fff;
}

.classic-item {
  flex: 0 0 50%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.classic-item:nth-child(odd) {
  padding-right: 8px;
}
.classic {
  width: 100%;
  background: #f8f8f9;
  border-radius: 15px;
  height: 100px;
}
.classic .left {
  float: left;
}
.classic .classic-img {
  float:right;
  width:40%;
  height:70px;
  float:left;
  top: 43px;
  margin-top: 27px;
  margin-left: 12px;
  z-index:-1;
}
.classic .bookType {
  font-size: 16px;
  padding-top:13px;
  margin-left:20px;

}
.classic .bookNum {
  font-size:  12px;
  margin-top: 75rpx;
  margin-left: 40rpx;
  color: #80848f;
}
.classic-wrapper {
  margin-bottom: 15px;
}




</style>
