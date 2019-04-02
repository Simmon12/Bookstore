<template>
  <div class="search-detail-container" >
  	<div class="container">
	    <div class='header'>
	      <div class='search-container'>
	        <img class='icon' src='/static/images/search.png'></img>
	        <input @confirm="onConfirm" placeholder='书籍名' class='bar' auto-focus='true' placeholder-class='in-bar' ></input>
	        <img @click='onDelete' class='cancel-img' src='/static/images/cancel.png'></img>
	      </div>
	</div>
    <div v-if="!searching">
      <div class='history'>
        <div class='title'>
          <div class='chunk'></div>
          <text>历史搜索</text>
        </div>
        <div class='tags'>
          <div v-for="(item, index) in  historyWords" :key="index">
          	<div class="tag-cmp">
          		<tag @tapping="toSearch" :text="item">
            </tag>
          	</div>
          </div>
        </div>
      </div>
    </div>

    <div class='books-container' v-if="searching">
        <div v-for="(item, index) in dataArray" :key="index">
          <div class="book">
          	<book :book="item"></book>
          </div>
        </div>
    </div>

    <text v-if="noneResult" class='empty-tip'>没有搜索到书籍</text>
  </div>
  </div>
</template>

<script>
import book from '@/components/search/book';
import tag from '@/components/tag/tag';
import {get} from '@/util/util'
import config from '@/config'
export default {
	data() {
		return {
			historyWords: [],
			searching: false,
			dataArray: [],
			noneResult: false
		}
	},
	mounted() {
		this.historyWords = wx.getStorageSync('historys') || [];
	},
	methods: {
		async onConfirm(event) {
			let word = event.mp.detail.value;
			let maxLength = 10;


			let booksRes = await get(config.getBooksByBookName(word));
			if (booksRes.books.length) {
				this.dataArray = booksRes.books;
			} else {
				this.dataArray = [];
				this.noneResult = true;
			}
			this.searching = true;
			

			let historys = wx.getStorageSync('historys');
			if (!historys) {
				historys = [];
			} 
			const has = historys.includes(word);
			if (!has) {
				const length = historys.length;
				if (length >= maxLength) {
					historys.pop();
					this.historyWords.pop();
				}
				historys.unshift(word)
				this.historyWords.unshift(word)
				wx.setStorageSync('historys', historys)
			}
		

		},
		async toSearch(value) {
			let word = value;
			console.log(value)
			let booksRes = await get(config.getBooksByBookName(word));
			if (booksRes.books.length) {
				this.dataArray = booksRes.books;
			} else {
				this.dataArray = [];
				this.noneResult = true;
			}
			this.searching = true;
		},
		onDelete() {
			this.searching = false;
			this.noneResult = false;
		}
	},
	components: {
		tag,
		book
	}
}

</script>

<style rel="stylesheet">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.history {
	width: 690rpx;
	margin: 40rpx 0 20rpx 0;
	display: flex;
	font-size: 14px;
	margin-top: 160rpx;
	flex-direction: column;
}

.hot-search {
	margin-top: 70rpx;
}

.title {
	line-height: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.search-container {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 50px;
}

.books-container .book {
	margin-bottom: 25rpx;
}

.cancel-img {
	width: 14px;
	height: 14px;
	margin-right: 10px;
}

.books-container {
	width: 570rpx;
	margin-top: 100rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 0 90rpx 0 90rpx;
	justify-content: space-between;
}

.loading {
	margin: 50rpx 0 50rpx 0;
}

.loading-center {
	position: absolute;
	top: 50%;
	left: 50%;
}

.empty-tip {
	display: inline-block;
	width: 100%;
	text-align: center;
	position: absolute;
	top: 50%;
}

.icon {
	width: 14px;
	height: 14px;
	margin-left: 12px;
	margin-right: 8px;
}

.in-bar {
	color: #999;
}

.cancel {
	line-height: 34px;
	width: 60px;
	text-align: center;
	display: inline-block;
	border: none;
}

.chunk {
	height: 15px;
	width: 5px;
	background-color: #000;
	display: inline-block;
	margin-right: 10px;
}

.tags {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 24rpx;
	padding-left: 15px;
	width: 630rpx;
}

.tag-cmp {
	padding-right: 25px;
	margin-bottom: 10px;
}

.header {
	background-color: #ffffff;
	position: fixed;
	height: 100rpx;
	border-bottom: 1px solid #f5f5f5;
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	z-index: 99;
	margin: 0 15px;
}

.bar {
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
	display: inline-block;
	height: 34px;
	width: 290px;
	font-size: 14px;
}

.test {
	background-color: #000;
}

</style>
