/*要求：能根据接口文档定义接口请求 包含应用中所有接口请求函数的模块 每个函数的返回值都是promise*/
import  jsonp from 'jsonp'
import ajax from './ajax'
import resolve from "resolve";
import {message} from "antd";

const BASE=''

//登陆
export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')

//添加用户
export const reqAddUser=(user)=>ajax(BASE+'/manage/user/add',{user},'POST')

//获取一级/二级分类的列表
export const reqCategorys=(parentId)=>ajax(BASE+'/manage/category/list',{parentId})
//添加分类  需修改为{categoryName,parentId}
export const reqAddCategory=(parentId)=>ajax(BASE+'/manage/category/add',{parentId},'POST')
//更新分类
export const reqUpdateCategory=({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')

//获取一个分类
export const reqCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{categoryId})

//获取商品分页列表
export const reqProducts=(pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{pageNum,pageSize})

//更新商品的状态(上架/下架)
export const reqUpdateStatus=(productId,status)=>ajax(BASE+'/manage/product/updateStatus',{productId,status}, 'POST')

//搜索商品分页列表(根据商品名称/商品描述)
/*searchType:搜索的类型，productName/productDesc*/
export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',{pageNum,pageSize,[searchType]:searchName})

//搜索商品分页列表(根据商品描述)
//export const reqSearchProducts=()=>ajax(BASE+'/manage/product/search',{pageNum,pageSize,productDesc:searchName})

//删除指定名称的图片
export const reqDeleteImg=(name)=>ajax(BASE+'/manage/img/delete',{name},'POST')

//添加/修改商品
export const reqAddOrUpdateProduct=(product)=>ajax(BASE+'/manage/product/'+(product._id?'update':'add'),product,'POST')
//修改商品
//export const reqUpdateProduct=(product)=>ajax(BASE+'/manage/product/update',product,'POST')

// 获取所有角色的列表
export const reqRoles=()=>ajax(BASE+'/manage/role/list')
// 获取所有角色的列表
export const reqAddRole=(roleName)=>ajax(BASE+'/manage/role/add',{roleName},'POST')

/*json请求的接口函数*/
export const reqWeather=()=>{
  return  new Promise((resolve,reject)=>{
  const url=`https://restapi.amap.com/v3/weather/weatherInfo?city=310000&key=c65900ac466a99192ebdf3d311f98749`
  //发送jsonp请求
  jsonp(url,{},(err,data)=>{
    console.log('jsonp()',err,data)
    //如果成功了
    if(!err && data.status==='1'){
      //取出需要的数据
      console.log(data.lives[0].weather)
      const weather=data.lives[0].weather
      resolve(weather)
    }else{
      //如果失败了
      message.error('获取天气信息失败！')
    }
    
  })
  })
}
reqWeather()
