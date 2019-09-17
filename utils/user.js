const nanoid = require('nanoid');
const Redis = require('../db/redis');

module.exports = {
    /**
     * 获取一个随机的session key
     */
    getSessionKey() {
        return nanoid(20);
    },
    setSession(uuid, token, data) {
        //设置缓存生效时间一个月，60*60*24*30=2592000
        Redis.set(`user_${uuid}_${token}`, JSON.stringify(data), 'EX', 100);
    },
    async getSession(uuid, token) {
        const data = await Redis.get(`user_${uuid}_${token}`);
        if (!data) return null;
        return JSON.parse(data);
    }
};
