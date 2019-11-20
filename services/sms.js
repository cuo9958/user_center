const SMSClient = require('@alicloud/sms-sdk');
const config = require('config');
const Redis = require('../db/redis');
const LRU = require('lru-cache');

const smsClient = new SMSClient({
    accessKeyId: config.get('sms.accessKeyId'),
    secretAccessKey: config.get('sms.secretAccessKey')
});

const SignName = config.get('sms.name');
const TemplateCode = config.get('sms.template');

//60秒缓存
const cache = new LRU({
    maxAge: 1000 * 60
});

module.exports = {
    /**
     * 发送短信,1分钟的缓存
     * @param {*} tell
     * @param {*} code
     */
    async postCode(tell, code) {
        const key = `sms_${tell}_${code}`;
        if (cache.has(key)) return false;
        const val = await Redis.get(key);
        if (val) return false;
        smsClient.sendSMS({
            PhoneNumbers: tell,
            SignName,
            TemplateCode: TemplateCode,
            TemplateParam: `{"code":"${code}"}`
        });
        Redis.set(key, code, 'EX', 60);
        return true;
    },
    /**
     * 检查code是否存在
     * @param {*} tell
     * @param {*} code
     */
    async checkCode(tell, code) {
        const key = `sms_${tell}_${code}`;
        if (cache.has(key)) {
            return code === cache.get(key);
        }
        const val = await Redis.get(key);
        if (!val) return false;
        return val === code;
    },
    createCode(len = 4) {
        let code = Math.round(Math.random() * 10000) + '';
        code = code.padStart(len, '0');
        return code;
    }
};
