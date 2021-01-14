import React,{Component} from 'react'
import {Link,withRouter} from "react-router-dom";
import { Menu} from 'antd';

import logo from '../../assets/images/logo192.png'
import menuList from '../../config/menuConfig'
import './left-nav.less'
const { SubMenu } = Menu;

/*左侧导航的组件*/
 class LeftNav extends Component{
/*两种方法：方法一根据menu的数据数组生成对应的标签数组  使用map()+递归调用*/
  getMenuNodes_map=(menuList)=>{
    return menuList.map(item=>{
     /* {
        title:'首页', //菜单标题名称
          key:'/home', //对应的path
          children:[], //可能有，也可能没有
      },*/
      if (!item.children){
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      }else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  /*两种方法：方法二根据menu的数据数组生成对应的标签数组  使用reduce()+递归调用*/
   getMenuNodes=(menuList)=>{
     //得到当前请求的路由路径
     const path=this.props.location.pathname
     
        return menuList.reduce((pre,item)=>{
          //向pre添加<Menu.Item>
          if(!item.children){
            pre.push((
              <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>
                {item.title}
              </Link>
            </Menu.Item>
            ))
          }else {
            //查找一个与当前请求路径匹配的子item
            const cItem=item.children.find(cItem=>cItem.key===path)
            //如果存在，说明当前item的子列表需要打开
            if(cItem){
              this.openKey=item.key
            }
            
            //向pre添加<SubMenu>
            pre.push((
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {this.getMenuNodes(item.children)}
              </SubMenu>
            ))
          }
          return pre
        },[])
   }
   //在第一次render（）之前执行一次  为第一个render（）准备数据（必须同步的）
   componentWillMount() {
     this.menuNodes=this.getMenuNodes(menuList)
   }
  
   render() {
     //得到当前请求的路由路径
    const path=this.props.location.pathname
    console.log('render()',path)
    //得到需要打开菜单项的key
    const openKey=this.openKey
    return(
      <div className="left-nav">
        <Link to='/' className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>管理后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {/*<Menu.Item key="/home" icon={<PieChartOutlined />}>
            <Link to='/home'>
              首页
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="/category" icon={<MailOutlined />}>
              <Link to='/category'>品类管理</Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<MailOutlined />}>
              <Link to='/product'>商品管理</Link>
            </Menu.Item>
          </SubMenu>*/}
          {
            this.menuNodes
          }
         {/* <Menu.Item key="/user" icon={<PieChartOutlined />}>
            <Link to='/user'>
              用户管理
            </Link>
          </Menu.Item>
          <Menu.Item key="/role" icon={<PieChartOutlined />}>
            <Link to='/role'>
              角色管理
            </Link>
          </Menu.Item>*/}
        </Menu>
      </div>
    )
  }
}
/* withRouter高阶组件 包装非路由组件，返回一个新组件 新的组件向非路由组件传递3个属性:history/location/match*/
export default withRouter(LeftNav)
