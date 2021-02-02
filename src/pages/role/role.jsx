import React,{Component} from 'react'
import {Card, Button, Table, Modal, message} from 'antd';
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles,reqAddRole} from "../../api";
import RoleAddForm from "./role-add-form";
import RoleAuthForm from "./role-auth-form";

/*角色路由*/
export default class Role extends Component{
  
  state={
    roles:[ // 所有角色的列表 如果为服务器传值,接口可用，需删除以下内容，为空数组
      {
      "menus":[
        "/home",
        "/role",
        "/charts/bar"
      ],
        "_id":"1",
        "name":"测试",
        "create_time":1554639521749,
        "__v":0,
        "auth_time":1558410329436,
        "auth_name":"admin"
      },
      {
        "menus":[
          "/home",
          "/role",
          "/products",
          "/category",
          "/product"
        ],
        "_id":"2",
        "name":"经理",
        "create_time":1554639536419,
        "__v":0,
        "auth_time":1558410638946,
        "auth_name":"admin"
      },
      {
        "menus":[
          "/home",
          "/products",
          "/category",
          "/product",
          "/role",
        ],
        "_id":"3",
        "name":"角色1",
        "create_time":1554639552758,
        "__v":0,
        "auth_time":1557630307021,
        "auth_name":"admin"
      },
      {
        "menus":[],
        "_id":"4",
        "name":"角色2",
        "create_time":1554639619910,
        "__v":0,
      }
    ],
    role:{}, // 选中的role
    isShowAdd:false, //是否显示添加界面
    isShowAuth:false, //是否显示设置权限界面
  }
  
  initColumn=()=>{
    this.columns=[
      {
        title:'角色名称',
        dataIndex:'name'
      },
      {
        title:'创建时间',
        dataIndex:'create_time'
      },
      {
        title:'授权时间',
        dataIndex:'auth_time'
      },
      {
        title:'授权人',
        dataIndex:'auth_name'
      }
    ]
  }
  
  getRoles=async ()=>{
    const result=await reqRoles()
    if (result.status===0){
      const roles=result.data
      this.setState({
        roles
      })
    }
  }
  
  onRow=(role)=>{
    return {
      onClick: event => { // 点击行
        console.log('row onClick()',role)
        // alert('点击行')
        this.setState({
          role
        })
      },
    }
  }
  
  /*添加角色*/
  addRole=()=>{
    //进行表单验证，只能通过了才向下处理
    this.form.validateFields().then( (error,values)=>{
      if (!error){
        
        //隐藏确认框
        this.setState({
          isShowAdd:false
        })
        
        // 收集输入数据
        const {roleName}=values
        this.form.resetFields()
        //请求添加
        const result=reqAddRole(roleName)
        // 根据结果提示/更新列表显示
        if (result.status===0){
         message.success('添加角色成功')
          //this.getRoles()
          //新产生的角色
          const role=result.data
          //更新roles状态
          /*const roles=this.state.roles
          roles.push(role)
          this.setState({
            roles
          })*/
  
          //更新roles状态:基于原本状态数据更新
          this.setState(state=>({
            roles:[...state.roles,role]
          }))
          
        }else {
          message.success('添加角色失败')
        }
        
      }
    })
    
    
  }
  
  /*更新角色*/
  updateRole=()=>{}
  
  componentWillMount() {
    this.initColumn()
  }
  
  componentDidMount() {
    this.getRoles()
  }
  
  render() {
    
    const {roles,role,isShowAdd,isShowAuth}=this.state
    
    const title=(
      <span>
        <Button type="primary" onClick={()=>this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
        <Button type="primary" disabled={!role._id} onClick={()=>this.setState({isShowAuth: true})}>设置角色权限</Button>
      </span>
    )
    
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize:PAGE_SIZE}}
          rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
          onRow={this.onRow}
        />
  
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={()=>{
            this.setState({isShowAdd: false})
            this.form.resetFields()
          }}
        >
          <RoleAddForm setForm={(form)=>this.form=form} />
        </Modal>
        
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={()=>{
            this.setState({isShowAuth: false})
          }}
        >
          <RoleAuthForm role={role} />
        </Modal>
      </Card>
    )
  }
}
