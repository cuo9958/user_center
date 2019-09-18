const Router = require('koa-router');
const config = require('config');
const UserModel = require('../models/user');
const Redis = require('../db/redis');
const UserUtil = require('../utils/user');
const axios = require('axios');
const WechatAppModel = require('../models/wechat_app');

const router = new Router();
const appid = config.get('wechat_app.appid');
const secret = config.get('wechat_app.secret');

router.all('/login', async function(ctx, next) {
    const code = ctx.request.body.code || ctx.query.code;
    const token = UserUtil.getSessionKey();
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
    const token = ctx.query.token;
    const uuid = ctx.query.uuid;

    const model = ctx.request.body;
    try {
        const model = await UserUtil.getSession(uuid, token);
        if (!model) throw new Error('登录失效');
        WechatAppModel.update(model, uuid);
        UserModel.update(
            {
                username: model.nickName,
                headimg: model.avatarUrl
            },
            uuid
        );
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
