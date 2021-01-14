import React,{Component} from 'react'
import { Form, Select,Input} from 'antd';
import PropTypes from "prop-types";

const Item=Form.Item
const Option=Select.Option
/*添加分类的form组件*/
export default class AddForm extends Component{
  static propTypes={
    setForm:PropTypes.func.isRequired,  //用来传递form对象
    categorys:PropTypes.array.isRequired, //一级分类的数组
    parentId:PropTypes.string.isRequired, //父分类的ID
  }
  
  componentWillMount() {
    this.props.setForm(this.props.from)
  }
  
  render() {
    const {categorys,parentId}=this.props
    return (
      <Form
        initialValues={{parentId:parentId}}
      >
        <Form.Item>
          <Select>
            <Option value='0'>一级分类</Option>
            <Option value='1'>电脑</Option>
            <Option value='2'>图书</Option>
            {
              categorys.map(c=><Option value={c._id}>{c.name}</Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item  rules={[{required:true,message:'分类名称必须输入'}]}>
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    )
  }
}


