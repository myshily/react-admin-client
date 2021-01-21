import React,{Component} from 'react'
import { Card, Form,Input,Cascader,Upload,Button} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

import PicturesWall from "./pictures-wall";
import LinkButton from "../../components/link-button/link-button";
import {reqCategorys} from "../../api";

//如服务器请求接口正常，需要删除数组
const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

const { TextArea } = Input


/*Product的添加和更新的子路由组件*/
 class ProductAddUpdate extends Component{
   
   state={
     optionLists,  //如服务器请求接口正常，需修改为 optionLists:[]
   }
  
   initOptions=async (categorys)=>{
     //根据categorys生成options数组
     const optionLists=categorys.map(c=>({
       value: c._id,
       label: c.name,
       isLeaf: false, //不是叶子
     }))
     
     // 如果是一个二级分类商品的更新
     const {isUpdate,product}=this
     const {pCategoryId,categoryId}=product
     if (isUpdate && pCategoryId!=='0'){
       // 获取对应的二级分类列表
       const subCategorys=await this.getCategorys(pCategoryId)
       //生成二级下拉列表的options
       const childOptions=subCategorys.map(c=>({
         value: c._id,
         label: c.name,
         isLeaf: true,
       }))
       //找到当前商品对应的一级option对象
       const targetOption=optionLists.find(option=>option.value===pCategoryId)
       // 关联到对应的一级option上
       targetOption.children=childOptions
     }
     
     //更新options状态
     this.setState({
       optionLists
     })
   }
   
   /*异步获取一级/二级分类列表，并显示 async函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定*/
   getCategorys=async (parentId)=>{
     const result=await reqCategorys(parentId)  //{status:0,data:categorys}
     if (result.status===0){
       const categorys=result.data
       //如果是一级分类列表
       if (parentId==='0'){
         this.initOptions(categorys)
       }else {  //二级列表
         return categorys  // 返回二级列表===>当前async函数返回的promise就会成功且value为categorys
       }
       
     }
   }
   
   /*验证价格的自定义验证函数*/
   validatePrice=(rule,value)=>{
     if (value*1 > 0){
       return Promise.resolve() //验证通过
     }else {
       return Promise.reject('价格必须大于0') //验证没通过
     }
   }
  
   //加载下一级列表的回调函数
   loadData = async selectedOptions => {
     //得到选择的option对象
     const targetOption = selectedOptions[0];
     //显示loading
     targetOption.loading = true;
     
     //根据选中的分类，请求获取二级分类列表
     const subCategorys=await this.getCategorys(targetOption.value)
     //隐藏loading
     targetOption.loading = false;
     // 二级分类数组有数据
     if (subCategorys && subCategorys.length>0){
       // 生成一个二级列表的options
       const childOptions=subCategorys.map(c=>({
         value: c._id,
         label: c.name,
         isLeaf: true, //不是叶子
       }))
       //关联到当前option上
       targetOption.children=childOptions
     }else {  //当前选中的分类没有二级分类
       targetOption.isLeaf=true
     }
    
     // 模拟请求异步获取二级列表数据，并更新
     setTimeout(() => {
       targetOption.loading = false;
       targetOption.children = [
         {
           label: `${targetOption.label} Dynamic 1`,
           value: 'dynamic1',
           isLeaf: true,
         },
         {
           label: `${targetOption.label} Dynamic 2`,
           value: 'dynamic2',
           isLeaf: true,
         },
       ];
       /*更新options状态  如服务器接口请求正常，需删除setTimeout以及内部的所有内容，
       只保留 this.setState({
         options:[...this.state.optionLists]
       })
       */
       this.setState({
         options:[...this.state.optionLists]
       })
     }, 1000);
   };
   
   /*submit=()=>{
     // 进行表单验证，如果通过了，才发送请求
     this.props.form.validateFields((err,values)=>{
       if (!err){
         alert('发送ajax请求',values)
       }
     })
   }*/
   
   componentDidMount() {
     this.getCategorys('0')
   }
  
   componentWillMount() {
     //取出携带的state
     const product=this.props.location.state  // 如果是添加没值，否则有值
     // 保存是否是更新的标识
     this.isUpdate=!!product
     // 保存商品（如果没有，保存是{}）
     this.product=product || {}
   }
  
   render() {
     
     const {isUpdate,product}=this
     const {pCategoryId,categoryId}=product
  // 用来接收级联分类ID的数组
     const categoryIds=[]
     if (isUpdate) {
       // 商品是一个一级分类的商品
       if (pCategoryId==='0'){
         categoryIds.push(categoryId)
       }else{
         // 商品是一个二级分类的商品
         categoryIds.push(pCategoryId)
         categoryIds.push(categoryId)
       }
     }
    
    // 进行表单验证，如果通过了，才发送请求
    const onFinish = (values) => {
      console.log('Success:', values)
    };
    
    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {
        span: 4,
      },  // 左侧label的宽度
      wrapperCol: {
        span: 8,
      }, // 右侧包裹的宽度
    };
    
    //头部左侧标题
    const title=(
      <span>
        <LinkButton onClick={()=>this.props.history.goBack()}>
          <ArrowLeftOutlined style={{fontSize:20}}/>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )
    
    return (
      <Card title={title}>
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            name="商品名称"
            label="商品名称"
            rules={[
              {
                required: true,
                message: '必须输入商品名称',
              },
            ]}
            initialValue={product.name}
          >
            <Input placeholder='请输入商品名称'/>
          </Form.Item>
          <Form.Item
            name="商品描述"
            label="商品描述"
            rules={[
              {
                required: true,
                message: '必须输入商品描述',
              },
            ]}
            initialValue={product.desc}
          >
            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item
            name="商品价格"
            label="商品价格"
            rules={[
              {
                required: true,
                message: '必须输入商品价格',
              },
              {validator:this.validatePrice}
            ]}
            initialValue={product.price}
          >
            <Input type='number' placeholder='请输入商品价格' addonAfter="元"/>
          </Form.Item>
          <Form.Item
            name="商品分类"
            label="商品分类"
            rules={[
              {
                required: true,
                message: '必须指定商品分类',
              },
            ]}
            initialValue={categoryIds}
          >
            <Cascader
              placeholder='请指定商品分类'
              options={this.state.optionLists} /*需要显示的列表数据数组*/
              loadData={this.loadData} /*当选择某个列表项，加载下一级列表的监听回调*/
              changeOnSelect
            />
          </Form.Item>
          <Form.Item label="商品图片">
            <PicturesWall/>
          </Form.Item>
          <Form.Item label="商品详情">
            <div>商品详情</div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default ProductAddUpdate
