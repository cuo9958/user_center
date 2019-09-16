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
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '用户的uid'
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
        nickname: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '发布人'
        },
        pwd: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '密码'
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
    find: function(username) {
        return User.findOne({
            where: {
                username
            }
        });
    },
    update: function(model, id) {
        return User.update(model, {
            where: {
                id
            }
        });
    },
    get: function(id) {
        return User.findOne({
            where: {
                id
            }
        });
    },
    getCount(limit = 1, opts = {}) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [['status', 'desc'], ['id', 'desc']]
        };
        return User.findAndCountAll(config);
    },
    change: function(status, id) {
        const model = {
            status
        };
        return User.update(model, {
            where: {
                id
            }
        });
    }
};
