import React,{Component} from 'react'
import { Form,Input} from 'antd'
import PropTypes from "prop-types"

/*添加分类的form组件*/
export default class RoleAddForm extends Component{
  static propTypes={
    setForm:PropTypes.func.isRequired,  //用来传递form对象
  }
  
  componentWillMount() {
    this.props.setForm(this.props.from)
  }
  
  render() {
  
    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {
        span: 4,
      },  // 左侧label的宽度
      wrapperCol: {
        span: 15,
      }, // 右侧包裹的宽度
    };
    
    return (
      <Form
        {...formItemLayout}
        initialValues='roleName'
      >
        <Form.Item label="角色名称" name="角色名称"  rules={[{required:true,message:'角色名称必须输入'}]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
      </Form>
    )
  }
}


