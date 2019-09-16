const Sequelize = require('sequelize');
const db = require('../db/mysql');

const Anonymous = db.define(
    't_anonymous',
    {
        uuid: {
            primaryKey: true,
            type: Sequelize.STRING(40),
            defaultValue: '',
            comment: '用户的uid'
        },
        brand: {
            type: Sequelize.STRING(40),
            defaultValue: '',
            comment: '品牌'
        },
        bundle_id: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '应用程序包名'
        },
        device_id: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '手机设备id'
        },
        device_type: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '手机设备类型'
        },
        facturer: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '手机制造商'
        },
        sys_name: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '操作系统名称'
        },
        disk_total: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '硬盘大小'
        },
        memory_total: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '内存大小'
        },
        unique_id: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '设备唯一id'
        },
        notch: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '设备是否有凹口'
        },
        tablet: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '设备是否平板'
        },
        emulator: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '设备是否模拟器'
        },
        supported_abis: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '处理器支持的内部版本'
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
// Anonymous.sync({ force: true });

module.exports = {
    insert: function(model) {
        return Anonymous.create(model);
    },
    find: function(uuid) {
        return Anonymous.findOne({
            attributes: ['uuid'],
            where: {
                uuid
            }
        });
    }
};
