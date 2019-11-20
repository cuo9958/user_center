const Router = require('koa-router');
const UserUtil = require('../utils/user');
const UserModel = require('../models/user');
const md5 = require('md5');
const SmsService = require('../services/sms');
const name = require('../services/name');

const router = new Router();

/**
 * 用户名密码登录
 */
router.post('/login', async function(ctx) {
    const { username, pwd } = ctx.request.body;
    try {
        if (!username || !pwd) throw new Error('用户名或密码错误');
        const data = await UserModel(username, md5(pwd));
        if (!data) throw new Error('用户名或密码错误');
        const model = UserUtil.setUserSession(data);
        ctx.body = {
            code: 1,
            data: model
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});
/**
 * 发送短信
 */
router.post('/sms/code', async function(ctx) {
    const { tell } = ctx.request.body;
    try {
        if (!tell || !/[0-9]{10-15}/.test(tell)) throw new Error('手机号不存在');
        await SmsService.postCode(tell, SmsService.createCode());
        ctx.body = {
            code: 1,
            data: tell
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});
/**
 * 短信登录
 */
router.post('/sms/login', async function(ctx) {
    const { tell, code } = ctx.request.body;
    try {
        if (!tell || !code) throw new Error('验证码错误');
        const res = await SmsService.checkCode(tell, code);
        if (!res) throw new Error('验证码错误');
        let data = await UserModel.tellLogin(tell);
        if (!data) {
            data = {
                uuid: name.gentear(),
                token: UserUtil.getToken()
            };
            UserModel.insert(data);
        }
        const model = UserUtil.setUserSession(data);
        ctx.body = {
            code: 1,
            data: model
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});

/**
 * 鉴权，判断用户的登录状态是否有效
 * head uuid
 * head token
 */
router.get('/auth', async function(ctx, next) {
    const { token, uuid } = ctx.headers;
    try {
        if (!token || !uuid) throw new Error('未登录');
        const model = await UserUtil.check(uuid, token);
        if (!model) throw new Error('登录失效');
        ctx.body = {
            code: 1,
            data: {
                uuid: model.uuid,
                username: model.username
            }
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});
exports.routers = router.routes();
