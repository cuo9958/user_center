const md5 = require('md5');

function checkBlank(val) {
    //空值检验
    if (val === undefined) return '';
    if (val === null) return '';
    if (typeof val === 'number' && isNaN(val)) return '';
    //字符串检验
    if (val === 'undefined') return '';
    if (val === 'null') return '';
    if (val === 'NULL') return '';
    if (val === 'NaN') return '';
    //数组检验
    if (val.constructor === Array && val.length === 0) return '';
    return val + '';
}
/**
 * 根据参数生成用户id
 * @param {*} data.brand? 手机品牌
 * @param {*} data.bundle_id? 应用程序包名
 * @param {*} data.device_id? 手机设备id
 * @param {*} data.device_type? 手机设备类型
 * @param {*} data.facturer? 手机制造商
 * @param {*} data.sys_name? 操作系统名称
 * @param {*} data.disk_total? 硬盘大小
 * @param {*} data.memory_total? 内存大小
 * @param {*} data.unique_id? 设备唯一id
 * @param {*} data.notch? 设备是否有凹口
 * @param {*} data.tablet? 设备是否平板
 * @param {*} data.emulator? 设备是否模拟器
 * @param {*} data.supported_abis? 处理器支持的内部版本
 */
function getParams(data, heads) {
    if (!data || !data.device_id) {
        data = heads;
    }
    const model = {
        brand: checkBlank(data.brand),
        bundle_id: checkBlank(data.bundle_id),
        device_id: checkBlank(data.device_id),
        device_type: checkBlank(data.device_type),
        facturer: checkBlank(data.facturer),
        sys_name: checkBlank(data.sys_name),
        disk_total: checkBlank(data.disk_total),
        memory_total: checkBlank(data.memory_total),
        unique_id: checkBlank(data.unique_id),
        notch: checkBlank(data.notch),
        tablet: checkBlank(data.tablet),
        emulator: checkBlank(data.emulator),
        supported_abis: checkBlank(data.supported_abis)
    };
    return model;
}
function getUuid(model) {
    const val =
        model.brand +
        model.bundle_id +
        model.device_id +
        model.device_type +
        model.facturer +
        model.sys_name +
        model.disk_total +
        model.memory_total +
        model.unique_id +
        model.notch +
        model.tablet +
        model.emulator +
        model.supported_abis;

    return md5(val);
}

module.exports = {
    gentear: function(data, heads) {
        const model = getParams(data, heads);
        return getUuid(model);
    },
    guid: function(data, heads) {
        const model = getParams(data, heads);
        model.uuid = getUuid(model);
        return model;
    }
};
