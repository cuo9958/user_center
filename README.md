# 用户中心

## 用户管理

### 接口层

#### 接口访问

1. 所有接口访问都需要在header中携带uuid和token
2. 根据不同的类型调用不用的登录
3. 所有鉴权统一使用user下的auth接口

#### 用户名秘密登录

POST `/api_user/user/login`

1. username
2. pwd
3. 返回用户信息和token

#### 发送短信

POST `/api_user/user/sms/code`

1. tell
2. 有效时间60秒

#### 手机号短信登录

POST `/api_user/user/sms/login`

1. tell
2. code
3. 返回用户信息和token

#### 用户鉴权

GET `/api_user/user/auth` head `token=123` `uuid=123`

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

### 小程序接口

使用小程序的登录注册

#### 登录接口

GET/POST `/api_user/wechat_app/login`

1. 参数：code。
2. 返回：uuid、token

#### 更新用户信息

POST `/api_user/wechat_app/update`

1. 参数：微信返回的用户信息
2. 返回：null
