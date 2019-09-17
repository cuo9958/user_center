/**
 * 游客行为
 * 1.登录
 * 2.鉴权
 */
const Router = require('koa-router');
const name = require('../utils/name');
const AnonymousModel = require('../models/anonymous');
const UserModel = require('../models/user');
const UserUtil = require('../utils/user');
const LRU = require('lru-cache');

const router = new Router();

//1小时缓存
const cache = new LRU({
    maxAge: 1000 * 60 * 60
});

/**
 * 游客登录:
 * 1.插入一条对应的数据，key是设备信息的md5
 * 2.获取一个key并返回
 * 3.写入主用户库
 * 4.把key和对应的主库id写入redis作为缓存
 */
router.post('/login', async function(ctx, next) {
    const model = name.guid(ctx.request.body, ctx.headers);
    if (cache.has(model.uuid)) {
        return (ctx.body = {
            code: 1,
            data: {
                uuid: model.uuid,
                token: cache.get(model.uuid)
            }
        });
    }
    const sessionKey = UserUtil.getSessionKey();
    try {
        await AnonymousModel.insert(model);
        await UserModel.insert({ uuid: model.uuid });
    } catch (err) {
        console.log(err.message);
    }
    cache.set(model.uuid, sessionKey);
    ctx.body = {
        code: 1,
        data: {
            uuid: model.uuid,
            token: sessionKey
        }
    };
    UserModel.findOne({ uuid: model.uuid })
        .then(res => {
            if (!!res) {
                UserUtil.setSession(model.uuid, sessionKey, res);
            }
        })
        .catch(err => console.log(err.message));
});

router.get('/login', async function(ctx, next) {
    const model = name.guid(ctx.query, ctx.headers);
    if (cache.has(model.uuid)) {
        return (ctx.body = {
            code: 1,
            data: {
                uuid: model.uuid,
                token: cache.get(model.uuid)
            }
        });
    }
    const sessionKey = UserUtil.getSessionKey();
    try {
        await AnonymousModel.insert(model);
        await UserModel.insert({ uuid: model.uuid });
    } catch (err) {
        console.log(err.message);
    }
    cache.set(model.uuid, sessionKey);
    ctx.body = {
        code: 1,
        data: {
            uuid: model.uuid,
            token: sessionKey
        }
    };
    UserModel.findOne({ uuid: model.uuid })
        .then(res => {
            if (!!res) {
                UserUtil.setSession(model.uuid, sessionKey, res);
            }
        })
        .catch(err => console.log(err.message));
});

exports.routers = router.routes();
