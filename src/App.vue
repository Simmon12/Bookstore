<script>
import config from './config'
import qcloud from 'wafer2-client-sdk'

export default {
  created() {
    // util.get('/weapp/demo').then((res)=>{
    //   console.log('类的封装')
    //   console.log(res)
    // })
    console.log("小程序启动")

    qcloud.setLoginUrl(config.loginUrl);

  }
}
</script>
<style>
</style>
