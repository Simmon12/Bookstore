<template>
  <div class="container">
    <div class='header'>
      <div class='search-container'>
        <img class='icon' src='/static/images/search.png'></img>
        <input @confirm="onConfirm" placeholder='书籍名' class='bar' auto-focus='true' placeholder-class='in-bar' value="q"></input>
        <img @click='onDelete' class='cancel-img' src='/static/images/cancel.png'></img>
      </div>
      <div class='cancel' @click='onCancel'>取消</div>
    </div>
    <div v-for="!searching">
      <div class='history'>
        <div class='title'>
          <div class='chunk'></div>
          <text>历史搜索</text>
        </div>
        <div class='tags'>
          <div v-for="(item, index) in  historyWords" :key="index">
            <tag :tapping="onConfirm" class="tag-cmp" :text="item">
            </tag>
          </div>
        </div>
      </div>

    </div>

     <div class='books-container' v-if="searching">
        <div v-for="(item, index) in dataArray" :key="index">
          <book :book="item" class="book"/>
        </div>
     </div>
     <text wx:if="{{noneResult}}" class='empty-tip'>没有搜索到书籍</text>
  </div>
</template>

<script>
import book from '@/components/search/book'
export default {
  data() {
    return {
      historyWords: ['知否知否，应是绿肥红瘦', '择天计', '欢喜债', '测试时代是地方四大 '],
      searching: false,
    }
  }
	methods: {

	},
  components: {
    book
  }
}

</script>

<style rel="stylesheet">

</style>
