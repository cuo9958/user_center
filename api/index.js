const Router = require('koa-router');
const UserUtil = require('../utils/user');
const UserModel = require('../models/user');
const md5 = require('md5');

const router = new Router();

/**
 * 用户名密码登录
 */
router.post('/login', async function(ctx) {
    const { username, pwd } = ctx.query;
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
