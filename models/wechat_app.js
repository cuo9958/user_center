const Sequelize = require('sequelize');
const db = require('../db/mysql');

const WechatApp = db.define(
    't_wechat_app',
    {
        openid: {
            primaryKey: true,
            type: Sequelize.STRING(40),
            defaultValue: '',
            comment: '用户的openid'
        },
        nickName: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '用户昵称'
        },
        avatarUrl: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '用户头像'
        },
        gender: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: '用户性别'
        },
        country: {
            type: Sequelize.STRING(40),
            defaultValue: '',
            comment: '国家'
        },
        province: {
            type: Sequelize.STRING(20),
            defaultValue: '',
            comment: '省份'
        },
        city: {
            type: Sequelize.STRING(30),
            defaultValue: '',
            comment: '城市'
        },
        language: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '语言'
        },
        status: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0,
            comment: '状态，默认0'
        }
    },
    {
        freezeTableName: true
    }
);

//强制初始化数据库
// WechatApp.sync({ force: true });

module.exports = {
    insert: function(model) {
        return WechatApp.create(model);
    },
    update(model, openid) {
        return WechatApp.update(model, {
            where: { openid }
        });
    },
    find: function(uuid) {
        return WechatApp.findOne({
            attributes: ['openid'],
            where: {
                uuid
            }
        });
    }
};
