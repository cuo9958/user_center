const nanoid = require('nanoid');
const Redis = require('../db/redis');
const LRU = require('lru-cache');

//10秒缓存
const cache = new LRU({
    maxAge: 1000 * 60
});

/**
 * 获取token
 */
function getToken() {
    return nanoid(20);
}
/**
 * 设置用户信息到redis
 * @param {*} key
 * @param {*} val
 */
function setRedis(key, data) {
    //设置缓存生效时间一个月，60*60*24*30=2592000
    Redis.set(key, JSON.stringify(data), 'EX', 2592000);
}

module.exports = {
    /**
     * 获取一个随机的token
     */
    getToken,
    /**
     * 设置缓存生效的情况
     * @param {*} model
     */
    setUserSession(model) {
        const token = this.getToken();
        const uuid = model.uuid;
        const key = `user_${uuid}_${token}`;
        const data = {
            uuid: model.uuid,
            token,
            username: model.username,
            nickname: model.nickname,
            headimg: model.headimg,
            tell: model.tell,
            status: model.status
        };
        setRedis(key, data);
        cache.set(key, data);
        return data;
    },
    setSession(uuid, token, data) {
        //设置缓存生效时间一个月，60*60*24*30=2592000
        // Redis.set(`user_${uuid}_${token}`, JSON.stringify(data), 'EX', 2592000);
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
