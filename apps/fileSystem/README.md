# 文件存储服务

这是一个简易的本地文件管理系统，包括前后端两个部分：

- `backendServer`：纯 Node.js 编写的后台服务（无框架依赖）  
- `frontend-test`：使用 Vue 3 + Vite + Element Plus 构建的前端页面

可实现文件的上传、下载及列表查看功能。

---

## 启动项目

### 启动后端服务

```bash
cd backendServer
node app.js
```

### 启动前端项目

```bash
cd frontend-test
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`，后端运行在 `http://localhost:8080`。

---

## 接口说明

### 1. 上传文件

- **方法**：`POST`  
- **接口**：`/upload`  
- **参数**：
  - `file`：要上传的文件

---

### 2. 获取文件列表

- **方法**：`GET`  
- **接口**：`/list`  
- **返回**：JSON 数组，包含所有上传文件的文件名

---

### 3. 下载文件

- **方法**：`GET`  
- **接口**：`/download`  
- **查询参数**：
  - `name`：需要下载的文件名（如 `1.txt`）
