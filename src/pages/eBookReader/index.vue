<template>
  <div class="book-reader" :class="ebookBgc">
    <div class="book-container"  @click="toggleTab">
      <div class="pre" v-show="notFirst" @click="jumptoPre">
        <i-icon type="return" color="#2dabf6"/>
        <span>上一章</span>
      </div>
      <div class="section-container" :style="{fontSize: initFontSize + 'px' }">
        <h2 class="title">{{section.sectionTitle}}</h2>
        <text class="content">{{section.sectionContent}}</text>
      </div>
      <div class="next" v-show="notLast">
        <i-button type="ghost" @click="jumptoNext">下一章</i-button>
      </div>
    </div>

    <div class="setting-container g_transition3s" :class="showSettingBg" >
      <div class="bookStyleSetting-container g_transition3s" v-show="showFontSet">
        <bookStyleSetting :initFontSize="initFontSize"  @changeFontSize="changeFontSize" @changeBgc="changeBgc" ></bookStyleSetting>
      </div>
      <div class="tabBar">
        <div class="col-class" @click="toggleMunu">
          <i-icon type="other" size="23"></i-icon>
          <p>目录</p>
        </div>
        <div class="col-class" @click="addInBookshelf">
          <i-icon type="add" size="23"></i-icon>
          <p v-if="added">已加入书架</p>
          <p v-else>加入书架</p>
        </div>
        <div class="col-class" @click="toggleFont">
          <i-icon type="setup" size="23"></i-icon>
          <p>设置</p>
        </div>
      </div>
    </div>

    <i-drawer mode="left" :visible="showMenu" @close="toggleMunu">
      <scroll-view scroll-y="true" class="menu-container">
        <i-tabs :current="current" @change="handleChange" class="tabs">
          <i-tab key="menu" title="目录"></i-tab>
          <i-tab key="stick" title="书签"></i-tab>
        </i-tabs>
        <div class="menu" :class="showMenuList">
          <i-cell-group >
            <i-cell is-link v-for="(item, index) in sectionLists" @click=jumptoSec(item.sectionId) :key="index">
              {{item.sectionTitle}}
            </i-cell>
          </i-cell-group>
        </div>
        <div class="stick" :class="showStickList">
          <i-cell-group :class="showStickList">
            <i-cell is-link url="">书签</i-cell>
          </i-cell-group>
        </div>


        <!--
        <swiper class="swiper" current="current" duration="200" @change="handleChange">
          <swiper-item>
            <i-cell-group >
              <i-cell is-link v-for="(item, index) in sectionLists" @click=jumptoSec(item.sectionId)>
                {{item.sectionTitle}}
              </i-cell>
            </i-cell-group>
          </swiper-item>
          <swiper-item>
            <i-cell-group :class="showStickList">
              <i-cell is-link url="">书签</i-cell>
            </i-cell-group>
          </swiper-item>
        </swiper> -->
      </scroll-view>
    </i-drawer>
  </div>
</template>
<script>
  import config from '@/config'
  import {get} from '@/util/util'
  import bookStyleSetting from '@/components/bookStyleSetting'
  export default {
    data() {
      return {
        book: {},
        bookId: -1,
        sectionId: -1,
        section: {},
        notFirst: true,
        notLast: true,
        showMenu: false,
        showTab: false,
        current: 'menu',
        sectionLists: [],
        showFontSet: false,
        initFontSize: 14,
        dayOrnight: 'day',
        added: false
      }
    },
    mounted() {
      var that = this;
      wx.getStorage({
        key: 'initFontSize',
        success: function (res) {
          that.initFontSize = res.data;
        }
      })

      wx.getStorage({
        key: 'dayOrnight',
        success: function(res) {
          that.dayOrnight = res.data;
        }
      })

      const bookId = that.$root.$mp.query.bookId;
      let latestReadSectionId = wx.getStorageSync(`latestRead${bookId}`);
      let sectionId;
      if (latestReadSectionId) {
      console.log('sectionIdssd11')
      console.log(latestReadSectionId)
        sectionId = latestReadSectionId
      } else {
        console.log('sectionIdssd')

        sectionId = that.$root.$mp.query.sectionId;
      }
      console.log(sectionId)
      

      let bookLists = wx.getStorageSync('bookshelf');
      let pos = -1;
      if(bookLists) {
        pos = bookLists.findIndex((value) => {
          return value == bookId
        })
      }
      
      if (pos == -1) { this.added = false }
      else           this.added = true;

      that.initBook(bookId);
      that.initContent(sectionId);
    },

    methods: {
      jumptoPre(sectionId) {
        let preSectionId = Number(this.sectionId) - 1;
        this.initContent(preSectionId);
        this.jumptoTop();

      },

      jumptoNext(sectionId) {
        let nextSectionId = Number(this.sectionId) + 1;
        this.initContent(nextSectionId);
        this.jumptoTop();
      },

      jumptoTop() {
          if (wx.pageScrollTo) {
            wx.pageScrollTo({
              scrollTop: 0
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
          }
      },

      jumptoSec(sectionId) {
        this.showMenu = false;
        this.initContent(sectionId);
      },

      handleChange (detail) {
        this.current = detail.mp.detail.key
      },

      toggleFont() {
        this.showFontSet = !this.showFontSet;
        console.log('font')
      },

      async initContent(sectionId) {
        wx.showToast({ title: '加载中',icon:'loading', duration: 1000000})

        this.sectionId = sectionId;
        this.notFirst = true;
        this.notLast = true;

        let sectionRes = await get(config.getContentById(sectionId));
        this.section = sectionRes.section[0];
        this.section.sectionContent = this.section.sectionContent.replace(/[\r|\n][\r|\n]/gm, '\n');
        wx.hideToast();


        let sectionIds = this.book.sectionArray.split(",");
        let len = sectionIds.length;
        if (sectionIds[0] == sectionId) {
          this.notFirst = false;
        }
        if (sectionIds[len-1] == sectionId) {
          this.notLast = false;
        }

        let latestRead = `latestRead${this.bookId}`;

        wx.setStorage({
          key: latestRead,
          data:sectionId
        })
      },

      async initBook(bookId) {

        let self = this;
        let bookRes = await get(config.getBookDetail(bookId));

        self.book = bookRes.book[0];
        self.bookId = bookId;
        wx.setNavigationBarTitle({
          title: self.book.bookName
        })
        self.sectionLists = await get(config.getSectionsBybookId(bookId));
        console.log('sdfjsd');
        console.log(self.sectionLists);
        // let sectionTitles = this.book.sectionTitles.split("#");
        // let sectionIds = this.book.sectionArray.split(",");
        // self.sectionLists = sectionIds.map(function (item, index) {
        //   return {'sectionId': item, 'sectionTitle': sectionTitles[index]};
        // })
        
        
      },

      toggleMunu() {
        console.log('')
        this.showMenu = !this.showMenu;
        this.showTab = false;
        this.showFontSet = false
      },

      toggleTab() {
        this.showTab = !this.showTab;
        this.showFontSet = false;
      },

      changeFontSize(fontSize) {
        let self = this;
        self.initFontSize = fontSize;
        wx.setStorage({
              key: "initFontSize",
              data: self.initFontSize
            })
      },

      changeBgc(time) {
        let self = this;
        if (time == 'day') {
          self.dayOrnight = 'day'
          wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#fff',
            animation: {
              duration: 200,
              timingFunc: 'easeIn'
            }
          })
        } else if (time == 'night') {
          self.dayOrnight = 'night';
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#112',
            animation: {
              duration: 200,
              timingFunc: 'easeIn'
            }
          })
        }
        wx.setStorage({
              key: "dayOrnight",
              data: self.dayOrnight
        })
      },

      addInBookshelf() {
        let bookLists = wx.getStorageSync('bookshelf');
        let bookshelfItems = wx.getStorageSync('bookshelfItems')
        let sectionIds = this.book.sectionArray.split(",");
        let Item = {'bookId': this.bookId, 'bookName': this.book.bookName, 'bookImage': this.book.bookImage,'sectionId': sectionIds[0] };
        this.added = true;

        if (bookLists) {
          let pos = bookLists.findIndex((value)=> {return value == this.bookId})
          if (pos == -1) { 
            bookshelfItems.push(Item)
            bookLists.push(this.bookId) 
          };
        } else {
          bookshelfItems = [Item];
          bookLists = [this.bookId];
        }
        console.log('bookshelf')
        console.log(bookshelfItems);
        wx.setStorage({
          key: "bookshelf",
          data: bookLists
        })
        wx.setStorage({
          key: "bookshelfItems",
          data: bookshelfItems
        })
      }

    },
    onReachBottom() {
      this.showTab = true;
    },
    computed: {
      showMenuList() {
        return this.current == 'menu' ? 'active' : '';
      },
      showStickList() {
        return this.current == 'stick' ? 'active' : '';
      },
      showSettingBg() {
        let res = '';
        if (this.showTab)               { res = res + 'translateY_0 '}
        if (!this.showTab)              { res = res + 'translaoteY_1 '}
        if (this.dayOrnight == 'night') { res = res + 'nightBgC'}
        if (this.dayOrnight == 'day')   { res = res + 'dayBgC'}
        return res;
      },
      DayNight() {
        return this.dayOrnight == 'day' ? 'dayBgC': 'nightBgC';
      },
      ebookBgc() {
        let res = '';
        if (this.showMenu) { res = res + 'book-ban '}
        if (this.dayOrnight == 'day') { res = res + 'dayBgC' }
        else if (this.dayOrnight == 'night') { res = res + 'nightBgC'}
        return res;
      },
      showFontSetanimate() {
        return this.showFontSet ? ' visible_1' : ' visible_0';
      }
    },
    components:{
      bookStyleSetting,
    },
  }
</script>

<style>
page {
  height: 100%;
}
.book-reader {
  color: #555;
}
.book-ban {
  height: 100%;
  overflow: hidden;
}

.book-container{
  margin: 0 15px;
}
.section-container {
  font-size: 18px;
  line-height: 31px;
  padding: 15px;
  letter-spacing: 1.2px;
  box-sizing: border-box;
}
.title {
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 800;
}
.content {
  font-weight: bold;
  color: #666;
}
.pre span{
  font-size: 13px;
  color: #2dabf6;
  padding-top: 1px;
}
.next {
  padding-bottom: 70px;
}

.setting-container {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e9e9e9;
}
.tabBar {
  height: 54px;
  font-size: 15px;
}
.col-class {
  height: 52px;
  display: inline-block;
  width: 32%;
  text-align: center;
  margin: 0 auto;
  text-align: center;
}
.col-class p {
  font-size: 15px;
}
.menu-container{
  width:80vw;
  z-index: 19;
  height: 100vh;
  background:#fff;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.menu, .stick {
  display: none;
  margin-top: 42px;
}
.active {
  display: block;
}
.tabs {
  position: fixed;
  top:0;
  z-index: 22;
  width: 100%;
  height: 18px;
}

.g_transition3s {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.translateY_0 {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.translaoteY_1 {
  -webkit-transform: translateY(54px);
  transform: translateY(54px);
}
.bookStyleSetting-container {
  margin-left: 20px;
  margin-bottom: 15px;
  z-index: 9;
}
.dayBgC {
  background: #fff;
}
.nightBgC {
  background-color: #112;
}
.visible_0 {
  -webkit-transform: translateY(54px);
  transform: translateY(54px);
}

.visible_1 {
  -webkit-transform: translateY(78px);
  transform: translateY(78px);
}



</style>

