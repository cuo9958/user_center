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
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '用户名'
        },
        tell: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '手机号'
        },
        openid: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '微信的openid'
        },
        status: {
            type: Sequelize.TINYINT,
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
    }
};
