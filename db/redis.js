const Redis = require('ioredis');
const config = require('config');

const cluster = new Redis.Cluster(config.redisCluster, {
    redisOptions: {
        reconnectOnError: function(err) {
            console.log('redis集群连接失败', err);
            return false;
        }
    }
});
console.log('连接redis集群');

module.exports = cluster;
