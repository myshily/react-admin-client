# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### 生产环境打包 npm run build
### 本地测试运行需有服务器的包  serve build(安装本地服务包 npm install -g serve)
### 实现组件的按需打包-下载依赖模块： yarn add react-app-rewired customize-cra babel-plugin-import

### jsonp解决ajax跨域的原理
###   1）jsonp只能解决GET类型的ajax请求跨域问题
###   2）jsonp请求不是ajax请求，而是一般的get请求
###   3）基本原理
###     浏览器端：
###        动态生成<script>来请求后台接口（src就是接口的url）
###        定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台（如：callback=fn）
###     服务器端：
###        接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
###     浏览器端：
###        收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据

## 1.静态界面
## 2.接口请求函数
## 3.胴体显示一级分类列表

# day05

##分页列表
##  1）.纯前台分页
##    请求获取数据：一次获取所有数据，翻页时不需要再发请求
##    请求接口：
##       不需要指定请求参数：页码（pageNum)和每页数量（pageSize)
##       响应数据：所有数据的数组
##  2）.基于后台分页
##    请求获取数据：每次只获取当前页的数据，翻页时要发请求
##    请求接口：
##      需要指定请求参数：页码（pageNum)和每页数量（pageSize)
##      响应数据：当前页数据的数组+总记录数（total）
##  3）.如何选择？
##      基本根据数据多少来选择
