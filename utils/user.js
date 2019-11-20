const nanoid = require('nanoid');
const Redis = require('../db/redis');
const LRU = require('lru-cache');

//10秒缓存
const cache = new LRU({
    maxAge: 1000 * 10
});

module.exports = {
    /**
     * 获取一个随机的session key
     */
    getSessionKey() {
        return nanoid(20);
    },
    setSession(uuid, token, data) {
        //设置缓存生效时间一个月，60*60*24*30=2592000
        Redis.set(`user_${uuid}_${token}`, JSON.stringify(data), 'EX', 2592000);
    },
    async getSession(uuid, token) {
        const data = await Redis.get(`user_${uuid}_${token}`);
        if (!data) return null;
        return JSON.parse(data);
    },
    //快速检查用户身份,使用本地的10秒缓存和redis缓存
    async check(uuid, token) {
        const key = `user_${uuid}_${token}`;
        let data = cache.get(key);
        if (!data) {
            data = await Redis.get(key);
            if (!data) {
                cache.set(key, 'none');
            } else {
                cache.set(key, data);
            }
        }
        return !!data && data !== 'none';
    }
};
