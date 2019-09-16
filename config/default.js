module.exports = {
    name: '用户中心',
    db: {
        master: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'user_center',
            connectionLimit: 2
        }
    },
    redisCluster: [
        {
            port: '6380',
            host: '127.0.0.1'
        }
    ]
};
