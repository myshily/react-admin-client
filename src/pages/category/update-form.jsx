import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd';

const Item=Form.Item

/*更新分类的form组件*/
 class UpdateForm extends Component{
   formRef=React.createRef()
    static propTypes={
      categoryName:PropTypes.string.isRequired,
      // setForm:PropTypes.func.isRequired
    }
    
    componentDidUpdate() {
     this.formRef.current.setFieldsValue({
       categoryName:this.props.categoryName
     })
    }
  
   // componentWillMount() {
   //    //将form对象通过setForm（）传递父组件
   //    this.props.setForm(this.props.from)
   //  }
  
  render() {
    const {categoryName}=this.props
    //const {getFieldDecorator}=this.refs.myForm.getFieldValue()
    return (
      <Form
        name="categoryName"
        ref={this.formRef}
      >
        <Item  rules={[{required:true,message:'分类名称必须输入'}]} initialValue={categoryName}>
          <Input placeholder='请输入分类名称' />
        </Item>
      </Form>
    )
  }
}

export default UpdateForm
