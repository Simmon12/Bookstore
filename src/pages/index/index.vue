<template>
  <div>{{test}}</div>

</template>

<script type="ecmascript-6">
export default {
  data() {
    return {
      test: ''
    }
  },
  mounted() {
    console.log(this.$root.$mp.query)
    this.test = this.$root.$mp.query;
  }
}

</script>

<style rel="stylesheet">

</style>
