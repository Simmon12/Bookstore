var dbs = {}
var redis = require('redis')
var client = redis.createClient()

client.on('error', function (err) {
  console.log('Error :', err)
})

client.on('connect', function() {
  console.log('redis连接成功')
})


dbs.set = function(key, value, expire, callback) {
  client.set(key, value, (err, result) => {
    if (err) {
      console.log("redis缓存设置失败:" + err)
      callback(err, null)
      return;
    }

    if (!isNaN(expire) && expire > 0) {
      client.expire(key, parseInt(expire))
    }
    callback(null, result)
  })
}
