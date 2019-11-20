const Sequelize = require('sequelize');
const db = require('../db/mysql');

const User = db.define(
    't_user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: Sequelize.STRING(40),
            defaultValue: '',
            comment: '用户的uuid'
        },
        username: {
            type: Sequelize.STRING(30),
            defaultValue: '',
            comment: '用户名'
        },
        nickname: {
            type: Sequelize.STRING(40),
            defaultValue: '',
            comment: '昵称'
        },
        headimg: {
            type: Sequelize.STRING(100),
            defaultValue: '',
            comment: '头像'
        },
        tell: {
            type: Sequelize.STRING(15),
            defaultValue: '',
            comment: '手机号'
        },
        pwd: {
            type: Sequelize.STRING(30),
            defaultValue: '',
            comment: '密码'
        },
        status: {
            type: Sequelize.TINYINT(2),
            defaultValue: 0,
            comment: '状态;0:失效;1:使用'
        }
    },
    {
        freezeTableName: true,
        indexes: [
            {
                fields: ['uuid']
            }
        ]
    }
);

//强制初始化数据库
// User.sync({ force: true });

module.exports = {
    insert: function(model) {
        return User.create(model);
    },
    findOne: function(data) {
        return User.findOne({
            where: data
        });
    },
    get: function(id) {
        return User.findOne({
            where: {
                id
            }
        });
    },
    update(model, uuid) {
        return User.update(model, {
            where: {
                uuid
            }
        });
    },
    /**
     * 用户名密码登录
     */
    userLogin(username, pwd) {
        return User.findOne({
            where: {
                username,
                pwd
            }
        });
    },
    /**
     * 手机号登录
     * @param {*} tell
     */
    tellLogin(tell) {
        return User.findOne({
            where: {
                tell
            }
        });
    }
};
