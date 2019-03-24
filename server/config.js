const CONF = {

    /*本地开发环境*/
    'serverHost': 'localhost',
    'tunnelServerUrl': '',
    'tunnelSignatureKey': '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',

    'wxMessageToken': 'weixinmsgtoken',
    'networkTimeout': 30000,
    /*本地开发环境*/

    port: '5757',
    rootPathname: '',

    'qcloudAppId': 1256973240,
    'qcloudSecretId': 'AKIDMgHvVudSYjoeOIK1a3P7Z7A2iH50w6MJ',
    'qcloudSecretKey': '1P0Sfl09B6qU0Y7Wlquq5LRyg8RnSxHf',

    // 微信小程序 App ID
    appId: 'wx78110ed5d8d33e82',

    // 微信小程序 App Secret
    appSecret: 'e04763e957ca0ccc73f8072d709639c3',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    // mysql: {
    //     host: 'localhost',
    //     port: 3306,
    //     user: 'root',
    //     db: 'cAuth',
    //     pass: 'wx78110ed5d8d33e82',
    //     char: 'utf8mb4'
    // },

    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'clz05062746',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 172800,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
