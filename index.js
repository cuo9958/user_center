const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
    const now = Date.now();
    await next();
    if (typeof ctx.body === 'object' && ctx.body.data) {
        ctx.body.t = Date.now() - now;
    } else {
        ctx.set('t', Date.now() - now);
    }
});

app.use(bodyParser());

//用户主体
router.use('/api_user/user', require('./api/index').routers);
//游客
router.use('/api_user/any', require('./api/anonymous').routers);
//小程序
router.use('/api_user/wechat_app', require('./api/wechat_app').routers);

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => console.error('server error', err));
const port = process.env.PORT || 19000;
app.listen(port, function() {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
