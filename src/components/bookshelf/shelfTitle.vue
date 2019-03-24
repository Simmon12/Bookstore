<template>
  <div class="container">
    <i-row>
      <i-col span="8" i-class="col-item1" @click="clearAll">全选</i-col>
      <i-col span="8" i-class="col-item2">请选择</i-col>
      <i-col span="8" i-class="col-item3" @click="finish">
        <span>完成</span>
      </i-col>
    </i-row>
  </div>
</template>

<script type="ecmascript-6">
export default {
  data() {
    return {
      edit: true
    }
  },
  methods: {
    finish() {
      this.$emit('finish', )
    },
    clearAll() {
      
    }
  }
}

</script>

<style rel="stylesheet">
.container {
  margin: 18px;
}
.col-item2 {
  text-align: center;
}
.col-item3{
  text-align: right;
}
</style>
