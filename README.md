## 用户中心

### 用户管理

#### 用户鉴权

GET `/api_user/user/auth?token=abc123`

1. 参数：token:用户的 token
2. 参数：uuid：用户的uuid
3. 返回：用户信息

### 游客类型访问

#### 游客注册

POST `/api_user/any/login`

#### 参数

参数来源：head、post 传参.不开启则不传

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

1. 传递设备参数，生成设备对应的唯一id
2. 返回用户的uuid和token
