/**
 * 游客行为
 * 1.登录
 * 2.鉴权
 */
const Router = require('koa-router');
const name = require('../utils/name');
const AnonymousModel = require('../models/anonymous');
const UserModel = require('../models/user');

const router = new Router();

/**
 * 游客登录
 */
router.get('/login', function(ctx, next) {
    const model = name.guid(ctx.query, ctx.headers);
    AnonymousModel.insert(model).catch(err => console.log(err.message));
    ctx.body = {
        status: 1,
        data: model.uuid
    };
    UserModel.findOne({ uuid: model.uuid })
        .then(res => {
            if (!res) {
                UserModel.insert({ uuid: model.uuid });
            }
        })
        .catch(err => console.log(err.message));
});
/**
 * 游客鉴权，必须登录之后才会鉴权成功。
 * 不需要鉴权则不用调
 */
router.get('/auth', async function(ctx, next) {
    const uuid = name.gentear(ctx.query, ctx.headers);
    const data = await AnonymousModel.find(uuid);
    if (!!data) {
        ctx.body = {
            status: 1,
            data: uuid
        };
    } else {
        ctx.body = {
            status: 0,
            data: uuid
        };
    }
});

exports.routers = router.routes();
