module.exports = {
    name: '用户中心',
    //mysql的配置
    db: {
        master: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'user_center',
            connectionLimit: 2
        }
    },
    //单台redis连接,支持字符串和对象
    redis: 'redis://127.0.0.1:6379',
    //redis集群模式
    redisCluster: [],
    //小程序的配置
    wechat_app: {
        appid: '',
        secret: ''
    },
    //阿里云短信的key
    sms: {
        accessKeyId: '',
        secretAccessKey: ''
    }
};
