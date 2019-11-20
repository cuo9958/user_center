const Router = require('koa-router');
const config = require('config');
const UserModel = require('../models/user');
const UserUtil = require('../utils/user');
const axios = require('axios');
const WechatAppModel = require('../models/wechat_app');
const LRU = require('lru-cache');

const router = new Router();
const appid = config.get('wechat_app.appid');
const secret = config.get('wechat_app.secret');

//1天缓存
const cache = new LRU({
    maxAge: 1000 * 60 * 60 * 24
});

router.all('/login', async function(ctx, next) {
    const code = ctx.request.body.code || ctx.query.code;
    const token = UserUtil.getToken();
    let uuid = '';
    try {
        const res = await axios.get(
            `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        );
        if (res.status !== 200) throw new Error('服务器连接失败');
        const data = res.data;
        if (data.errcode) throw new Error(data.errmsg);
        uuid = data.openid;
        //session_key,openid
    } catch (error) {
        console.log(error);
        return (ctx.body = {
            code: 0,
            msg: error.message,
            data: {}
        });
    }
    let user_data = {};
    try {
        const model = {
            openid: uuid
        };
        await WechatAppModel.insert(model);
        user_data = await UserModel.insert({ uuid });
    } catch (error) {
        user_data = await UserModel.findOne({ uuid });
    }
    UserUtil.setSession(uuid, token, user_data);
    ctx.body = {
        code: 1,
        data: {
            uuid,
            token
        }
    };
});

router.post('/update', async function(ctx, next) {
    const token = ctx.headers.token;
    const uuid = ctx.headers.uuid;

    const data = ctx.request.body;
    if (cache.has(uuid)) {
        return (ctx.body = {
            code: 1,
            data: {}
        });
    }
    try {
        const model = await UserUtil.getSession(uuid, token);
        if (!model) throw new Error('登录失效');
        WechatAppModel.update(data, uuid);
        UserModel.update(
            {
                username: data.nickName,
                headimg: data.avatarUrl
            },
            uuid
        );
        cache.set(uuid, true);
        ctx.body = {
            code: 1,
            data: {}
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});
exports.routers = router.routes();
