const Router = require('koa-router');
const UserUtil = require('../utils/user');

const router = new Router();

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
