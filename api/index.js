const Router = require('koa-router');
const name = require('../utils/name');
const config = require('config');
const UserModel = require('../models/user');

const router = new Router();

router.get('/', async function(ctx, next) {
    const uuid = name.gentear(ctx.query, ctx.headers);
    ctx.body = {
        status: 1,
        msg: '',
        data: {
            uuid
        }
    };
});
router.post('/', async function(ctx, next) {
    const uuid = name.gentear(ctx.request.body, ctx.headers);
    ctx.body = {
        status: 1,
        msg: '',
        data: {
            uuid
        }
    };
});

/**
 * 需要的api:
 * 1.根据客户端参数生成对应的用户
 * 2.根据生成的用户id获取用户信息
 * 3.给用户信息绑定手机号、微信等
 * 4.用户鉴权校验
 */

exports.routers = router.routes();
