<template>
  <div class="container">
    <img src='/static/images/my/my@bg.png' class='bg'></img>
    <!-- <div class="avatar-wrapper"> -->
      <button class="avatar-position button-clear" open-type="getUserInfo" lang="zh_CN" @getuserinfo="toLogin"  v-if="!logged" plain="true">
        <img  class='avatar' src="/static/images/my/my.png"/>
      </button>

      <div class="avatar-container avatar-position" v-else>
        <img :src="userinfo.avatarUrl" class='avatar'></img>
        <text>{{userinfo.nickName}}</text>
      </div>
    <!-- </div> -->

    <div class='about-container'>
      <div class='about-us' bindtap='onJumpToAbout'>
        <image src='/static/images/my/about.png'></image>
        <text class='description'>关于我们</text>
      </div>
      <div class='about-us'>
        <text class='book-num'></text>
        <text class='description'>最近阅读</text>
      </div>
    </div>

    <div class='item-container like-container'>
      <div class="like-item" v-for="(item, index) in likeItems" :key="index">
         <img :src="item.bookImage" class="like-image">
         <p class="bookName">{{item.bookName}}</p>
      </div>
    </div>





 <!--    <i-cell-group>
      <i-cell title="阅读记录" is-link url="/pages/eBookReader/main?bookId=38&sectionId=1099">
        <i-icon slot="icon" type="createtask" size="28" color="#80848f" />
      </i-cell>
      <i-cell title="关于我" is-link url="">
        <i-icon slot="icon" type="addressbook" size="28" color="#80848f" />
      </i-cell>
      <i-cell title="设置" is-link url="">
        <i-icon slot="icon" type="setup" size="28" color="#80848f" />
      </i-cell>
    </i-cell-group> -->

  </div>
</template>

<script>

  import config from '@/config'
  import {showModal, showSuccess, showLoading} from '@/util/util'
  import qcloud from 'wafer2-client-sdk'

  export default {
    data() {
      return {
        logged: false,
        userinfo: {},
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
      }
    },
    mounted() {
       let userinfo = wx.getStorageSync('userinfo')
       if (userinfo) {
        this.userinfo = userinfo;
        this.logged = true;
       }
    },
    methods: {
      toLogin(e) {
        console.log(e)
        const self = this;

        showLoading('正在登录');

        qcloud.setLoginUrl(config.loginUrl);
        let session = qcloud.Session.get();

        if (session) {
          // 第二次登录
          // 或者本地已有登录态，或者使用本函数更新登录态
          qcloud.loginWithCode({
            success: res => {
              console.log('没过期的登录', res)
              self.loginSuccess(res)
            },
            fail: err => {
              console.error(err)
              showModel('登录错误',err.message);
            }
          })
        } else {
          // 首次登录
          qcloud.login({
            success: res => {
              console.log('登录成功', res)
              self.loginSuccess(res)
            },
            fail: err => {
              console.error(err)
              showModel('登录错误',err.message);
            }
          })
        }

      },

      loginSuccess(userinfo) {
        this.userinfo = userinfo;
        this.logged = true;
        wx.setStorageSync('userinfo', userinfo);
        showSuccess('登录成功');
      }



    }

  }

</script>

<style rel="stylesheet">
.container{
  display:flex;
  flex-direction:column;
  align-items: center;
}

.bg{
  width:750rpx;
  height:574rpx;
}

.avatar-position{
  position:absolute; 
  top:255rpx;
}

.button-clear {
  padding: 0 !important;
  border:none !important;
}

.my-img{
  width:120rpx;
  height:120rpx;
}

.avatar-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}


.avatar{
  width:120rpx;
  height:120rpx;
  overflow: hidden;
  border-radius: 50%;
}

.about-container{
  padding: 0 100rpx;
  width:550rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position:absolute;
  top:440rpx;
}

.about-us image{
  width:34rpx;
  height:34rpx;
}
.preview-container{
  margin-top:30rpx;
  display: flex;
  flex-direction: row;
  padding:0 30rpx;
  flex-wrap: wrap;
  justify-content: space-between;
}

.preview{
  margin-bottom: 30rpx;
}
.about-us{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
}

.book-num{
  font-size:36rpx;
  color:#000000;
}

.description{
  font-size:24rpx;
  color:#999999;
}

.about-container > view:nth-child(2){
  margin-top: -5rpx;
}



.headline{
  margin-top:30rpx;
  width:97rpx;
  height:42rpx;
}

.study{
  width:88rpx;
  height:88rpx;
  position: absolute;
  top:40rpx;
  right:45rpx;
}

.like-container{
  width:100%;
  margin: 13rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-container {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  box-sizing: border-box;
  padding-right:19px;
}

.like-item {
  flex: 0 0 33.33%;
  width: 33.33%;
  padding-left:19px;
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

</style>
