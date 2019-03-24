<template>
  <div class="container">
    <div class="userinfo">
      <img class='userinfo-avatar' :src="logged ? userinfo.avatarUrl : '/static/images/user-unlogin.png'" background-size="cover">
      <button class="userinfo-nickname" open-type="getUserInfo" lang="zh_CN" @getuserinfo="toLogin"  v-if="!logged">点我登录</button>

      <span class="userinfo-nickname" v-else>
        {{ userinfo.nickName }}
      </span>
    </div>
    <i-cell-group>
      <i-cell title="阅读记录" is-link url="/pages/eBookReader/main?bookId=38&sectionId=1099">
        <i-icon slot="icon" type="createtask" size="28" color="#80848f" />
      </i-cell>
      <i-cell title="关于我" is-link url="">
        <i-icon slot="icon" type="addressbook" size="28" color="#80848f" />
      </i-cell>
      <i-cell title="设置" is-link url="">
        <i-icon slot="icon" type="setup" size="28" color="#80848f" />
      </i-cell>
    </i-cell-group>

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
  .userinfo {
      margin-top: 40rpx;
      height: 140rpx;
      width: 100%;
      background: #FFF;
      display: flex;
      flex-direction: row;
      align-items: center;
      transition: all 300ms ease;
  }

  .userinfo-avatar {
      width: 100rpx;
      height: 100rpx;
      margin: 20rpx;
      margin-left: 37rpx;
      border-radius: 50%;
  }

  .userinfo-nickname {
      font-size: 38rpx;
      margin-left: 40rpx;
      color: #007AFF;
      background-color: white;
  }

  .userinfo-nickname::after {
    border: none;
  }

</style>
