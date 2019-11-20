/**
 * 后端服务之间的传递
 */
const Router = require('koa-router');

const router = new Router();

router.get('/', async function(ctx, next) {
    ctx.body = {
        code: 0,
        msg: '用户不存在'
    };
});

exports.routers = router.routes();
