import React,{Component} from 'react'
import { Form,Input,Tree} from 'antd'
import PropTypes from "prop-types"
import menuList from "../../config/menuConfig";

/*添加分类的form组件*/
export default class RoleAuthForm extends Component{
  static propTypes={
    role:PropTypes.object
  }
  
  getTreeNodes=(menuList)=>{
    return menuList.reduce([])
  }
  
  componentWillMount() {
    this.treeData=this.getTreeNodes(menuList)
  }
  
  render() {
    const {role}=this.props
    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {
        span: 4,
      },  // 左侧label的宽度
      wrapperCol: {
        span: 15,
      }, // 右侧包裹的宽度
    };
  
    const treeData = [
      {
        title: '平台权限',
        key: 'all',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              {
                title: '0-0-0-0',
                key: '0-0-0-0',
              },
              {
                title: '0-0-0-1',
                key: '0-0-0-1',
              },
              {
                title: '0-0-0-2',
                key: '0-0-0-2',
              },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              {
                title: '0-0-1-0',
                key: '0-0-1-0',
              },
              {
                title: '0-0-1-1',
                key: '0-0-1-1',
              },
              {
                title: '0-0-1-2',
                key: '0-0-1-2',
              },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          {
            title: '0-1-0-0',
            key: '0-1-0-0',
          },
          {
            title: '0-1-0-1',
            key: '0-1-0-1',
          },
          {
            title: '0-1-0-2',
            key: '0-1-0-2',
          },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ];
    
    return (
      <div>
        <Form
          {...formItemLayout}
          initialValues='roleName'
        >
          <Form.Item label="角色名称" name="角色名称"  rules={[{required:true,message:'角色名称必须输入'}]}>
            <Input value={role.name} disabled/>
          </Form.Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          treeData={treeData}
        />
      </div>
    )
  }
}


