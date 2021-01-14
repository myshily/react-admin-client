/*能发送异步ajax请求的函数模块 封装axios库 函数的返回值是Promise对象
1.优化：统一处理请求异常
  在外层包一个自己创建的promise对象
  在请求出错时，不reject（err），而是显示错误提示
2.优化：异步得到不是res，而是res.data
  在请求成功resolve时：resolve(res.data)
* */
import axios from "axios";
import {message} from "antd";

export default  function ajax(url,data={},type='GET'){
  return new Promise((resolve,reject)=>{
    let promise
    //1.执行异步ajax请求
    if(type==='GET'){ //发GET请求
      promise= axios.get(url,{  //配置对象
        params: //指定请求参数
          data,

      })
    }else { //发post 请求
      promise= axios.post(url,data)
    }
    //2.如果成功了，调用resolve（value）
    promise.then(res=>{
      resolve(res.data)
    }).catch(err=>{
      //3.如果失败了，不调用reject（reason），而是提示异常信息
      // message('请求出错了:'+err.message)
    })

  })

}

//请求登陆接口
//ajax('/login',{username:'yoyo',password:'123456',},'POST').then()
//添加用户
//ajax('/manage/user/add',{username:'yoyo',password:'123456',phone:'13260008056'},'POST').then()
