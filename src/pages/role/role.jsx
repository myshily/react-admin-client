import React,{Component} from 'react'
import {Card, Button, Table} from 'antd';
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles} from "../../api";

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
  
  componentWillMount() {
    this.initColumn()
  }
  
  componentDidMount() {
    this.getRoles()
  }
  
  render() {
    
    const {roles,role}=this.state
    
    const title=(
      <span>
        <Button type="primary">创建角色</Button> &nbsp;&nbsp;
        <Button type="primary" disabled={!role._id}>设置角色权限</Button>
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
      </Card>
    )
  }
}
