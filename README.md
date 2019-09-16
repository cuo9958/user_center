## 用户中心

### 参数

参数来源：head、get传参、post传参.不开启则不传

```javascript
 /*
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
 * /
 ```

### 游客类型访问

#### 游客注册

1. 接口地址`/api_user/any`
2. 功能：登录、鉴权

##### 登录
`/login`

1. 方法：get
2. 参数：get传参或者head中携带
