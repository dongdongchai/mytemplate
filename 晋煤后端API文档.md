# 晋煤后端API文档

[toc]

## 1.说明

- 接口基准地址：`http://localhost:800/api/`
- 服务端已开启 CORS 跨域支持
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON
- **使不使用Token验证待定**

###  1.1 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 1.2 通用返回状态说明

| *状态码* | *含义*                | *说明*                               |
| -------- | --------------------- | ------------------------------------ |
| 200      | OK                    | 请求成功                             |
| 201      | CREATED               | 创建成功                             |
| 204      | DELETED               | 删除成功                             |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数 |
| 401      | UNAUTHORIZED          | 未授权                               |
| 403      | FORBIDDEN             | 被禁止访问                           |
| 404      | NOT FOUND             | 请求的资源不存在                     |
| 500      | INTERNAL SERVER ERROR | 内部错误                             |

## 2.用户

/user

### 2.1 登录 

/user/login

- 请求路径：login
- 请求方法：POST
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| token  | 令牌     |      |

- 响应数据

```javascript
{
    "data": {
        "token": "admin-token"
    },
    "msg": "登录成功",
    "code": 200
}
```

### 2.2 用户信息

/user/info


- 请求路径：info
- 请求方法：GET
- 请求参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| username | 用户名   |      |
| token    | 令牌     |      |

- 响应参数

| 参数名    | 参数说明 | 备注            |
| --------- | -------- | --------------- |
| roles     | 用户组别 | [admin, guest,] |
| introduce | 介绍     |                 |
| avatar    | 用户头像 |                 |
| name      | 用户名称 |                 |

- 响应数据

```javascript
{
    "data": {
           'roles': "admin",
            'introduction': "I am a super administrator",
            'avatar': "https://wpimg.8-484acafe.gif",
            'name': "Super Admin",
    },
    "msg": "用户信息",
    "code": 200
}
```


### 2.3 登出

/use/logout

- 请求路径：info
- 请求方法：POST
- 请求参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| username | 用户名   |      |
| token    | 口令     |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| token  | 口令     |      |

- 响应数据

```javascript
{
    "data": {
		 'token': 'admin-token'
    },
    "msg": "用户登出，口令已失效",
    "code": 200
}
```



## 3.设备管理

/api/drf/sensor

### 3.1 沉降监测传感器

/api/drf/sensor/cj

#### 3.1.1 添加沉降传感器

/api/drf/sensor/cj

- 请求路径：/api/drf/sensor/cj

- 请求方法：POST
- 请求参数

| 参数名 | 参数说明                      | 备注 |
| ------ | ----------------------------- | ---- |
| name   | 描述性文字，搜索设备时使用    | 非空 |
| serial | 序列号，调取API播放视频时使用 | 非空 |
| addr   | 按地点查询时使用              | 非空 |
| Line   | 线路                          | 非空 |
| Tower  | 杆塔                          | 非空 |
| Tel    | 联系电话                      | 非空 |

- 响应参数

  该沉降传感器对象

| 参数名            | 参数说明 | 备注 |
| ----------------- | -------- | ---- |
| name              |          |      |
| serial            |          |      |
| addr              |          |      |
| Line              |          |      |
| Tower             |          |      |
| Tel               |          |      |
| createTime        |          |      |
| day_since_created |          |      |

- 响应数据

```javascript
HTTP 200 OK
Allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "name": "24杆塔沉降上",
    "serial": "FRPHD-082641573",
    "addr": "晋中市-Y县-Q区-W街道",
    "Line": "109回线",
    "Tower": "493号杆塔",
    "Tel": "11540062247",
    "createTime": "2020-10-12T17:05:52.094228+08:00",
    "day_since_created": 3
}
```



#### 3.1.2 删除沉降传感器

- 请求路径：/api/drf/sensor/cj

- 请求方法：DELETE

- 请求参数

  | 参数名 | 参数说明 | 备注                     |
  | ------ | -------- | ------------------------ |
  | id     |          | 直接加id值，不用加"?id=" |

 - 响应数据

   已删除的沉降传感器对象

   | 参数名 | 参数说明 | 备注 |
   | ------ | -------- | ---- |
   |        |          |      |

   ```json
   {
       "name": "31杆塔沉降中",
       "serial": "SQRIA-379052816",
       "addr": "太原市-O县-Q区-E街道",
       "Line": "212回线",
       "Tower": "251号杆塔",
       "Tel": "13920137667",
       "createTime": "2020-10-12T17:06:49.484716+08:00",
       "day_since_created": 3
   }
   ```



#### 3.1.3 查询沉降传感器

/api/drf/sensor/cj

GET

通过id

- 示例

  ` http://127.0.0.1:800/api/drf/sensor/4`

- 响应参数

  ```json
  {
      "name": "31杆塔沉降中",
      "serial": "SQRIA-379052816",
      "addr": "太原市-O县-Q区-E街道",
      "Line": "212回线",
      "Tower": "251号杆塔",
      "Tel": "13920137667",
      "createTime": "2020-10-12T17:06:49.484716+08:00",
      "day_since_created": 3
  }
  ```

### 3.1.4 沉降传感器设备信息接口





#### 3.1.5 沉降传感器设备信息接口

/api/drf/sensor/cj

- 请求路径：/api/drf/sensor/cj

- 请求方法：OPTIONS

- 请求参数

  空

 - 响应参数

```js
{
    "name": "Settlement Sensor List",
    "description": "沉降设备信息接口",
    "renders": [
        "application/json",
        "text/html"
    ],
    "parses": [
        "application/json",
        "application/x-www-form-urlencoded",
        "multipart/form-data"
    ],
    "actions": {
        "POST": {
            "name": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "名称",
                "max_length": 32
            },
            "serial": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "序列号",
                "max_length": 20
            },
            "addr": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "安装位置",
                "max_length": 64
            },
            "Line": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "线路",
                "max_length": 64
            },
            "Tower": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "杆塔",
                "max_length": 64
            },
            "Tel": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "联系人",
                "max_length": 20
            },
            "createTime": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "CreateTime"
            },
            "day_since_created": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Day since created"
            }
        }
    }
}
```



### 3.2 倾斜监测传感器

/api/drf/sensor/qx

基本同上

### 3.3 摄像头

/api/drf/sensor/camera

#### 3.3.1 添加摄像头

/api/drf/sensor/camera

- 请求路径：/api/drf/sensor/camera
- 请求方法：POST
- 请求参数

| 参数名 | 参数说明                      | 备注 |
| ------ | ----------------------------- | ---- |
| name   | 描述性文字，搜索设备时使用    | 非空 |
| serial | 序列号，调取API播放视频时使用 | 非空 |
| addr   | 按地点查询时使用              | 非空 |
| Line   | 线路                          | 非空 |
| Tower  | 杆塔                          | 非空 |
| Tel    | 联系电话                      | 非空 |

- 响应参数

  该摄像头对象

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

- 响应数据

  基本同3.1.3

```javascript
{
    "data": {
		 'token': 'admin-token'
    },
    "msg": "用户登出，口令已失效",
    "code": 200
}
```



#### 3.3.2 删除摄像头

/api/drf/sensor/camera

DELETE

通过id

#### 3.3.3 摄像设备信息接口

/api/drf/sensor/camera

- 请求路径：/api/drf/sensor/camera

- 请求方法：OPTIONS

- 请求参数

  空

 - 响应参数

```js
以下内容待更新，已失效
"name": "Camera Device List",
    "description": "摄像设备信息接口",
    "renders": [

```



## 4.监控数据





### 4.1 摄像头





### 4.2 沉降监测传感器







### 4.3 倾斜监测传感器





## 5. 其他查询API

/device

### 5.1 addr_list

/device/addr_list

- 请求路径：/device/addr_list

- 请求方法：GET

- 请求参数

  空

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| 不需要参数 |          |      |


- 响应参数


| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| code     |              |          |
| msg      |              |          |
| addrlist | 去重地址列表 | 列表 [ ] |

- 响应数据

```javascript
{
    "addrlist": [
        "太原市-B县-W区-M街道",
        "太原市-O县-Q区-E街道",
        "太原市-Q县-E区-M街道",
        "太原市-Q县-W区-F街道",
        "太原市-Q县-W区-M街道",
        "太原市-W县-E区-F街道",
        "太原市-W县-Q区-F街道",
        "晋城市-W县-E区-M街道",
        "晋城市-W县-Q区-F街道",
        "晋城市-W县-Q区-M街道",
        "晋城市-W县-W区-F街道",
        "晋城市-W县-W区-M街道"
    ],
    "code": 200,
    "msg": "success"
}
```

### 5.2 Line_list

基本同上

### 5.3 Tower_list

基本同上











