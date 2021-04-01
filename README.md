
# CWPDFGenerator
一款通过网页链接输出pdf文件的服务
使用 google无头浏览器 puppeteer + eggjs框架 输入一个网页地址 就可以下载到网页的pdf文件

对于传统网页 puppeteer 生成pdf足够使用
但是对于 vuejs 开发的虚拟dom渲染的网页 有时会出现 puppeteer 提供的方法下载下来页面空白的情况
使用本服务只需在整个网页加载完所有资源和接口后 调用 /pdf/finish 接口 即可完成下载


## QuickStart

### Development

```bash
$ npm i
$ npm run dev

此时本服务就提供了2个接口

http://localhost:6990/pdf/finish
http://localhost:6990/pdf/execute

execute负责下载整个网页文件 
finish接口是需要下载的网页再加载完资源时调用

```

### Deploy

```bash
$ npm start
$ npm stop
```