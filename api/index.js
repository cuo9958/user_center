const Router = require('koa-router');
const name = require('../utils/name');
const config = require('config');
const UserModel = require('../models/user');
const Redis = require('../db/redis');
const UserUtil = require('../utils/user');

const router = new Router();

router.get('/test', async function(ctx, next) {
    const uuid = name.gentear(ctx.query, ctx.headers);
    ctx.body = {
        code: 1,
        msg: '',
        data: {
            uuid
        }
    };
});
router.get('/', async function(ctx, next) {
    ctx.body = {
        code: 1,
        msg: '',
        data: {}
    };
});

/**
 * 需要的api:
 * 1.根据客户端参数生成对应的用户
 * 2.根据生成的用户id获取用户信息
 * 3.给用户信息绑定手机号、微信等
 * 4.用户鉴权校验
 */

router.get('/auth', async function(ctx, next) {
    const token = ctx.query.token;
    const uuid = ctx.query.uuid;
    try {
        const model = await UserUtil.getSession(uuid, token);
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
