import React,{Component} from 'react'
import { Card, Table,Button,message,Modal} from 'antd';
import {PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';
import LinkButton from "../../components/link-button/link-button";
import {reqCategorys,reqUpdateCategory,reqAddCategory} from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

/*商品分类路由*/
export default class Category extends Component{
  state={
    loading:false, //是否正在获取数据中
    categorys:[], //一级分类列表 服务器传值数据 相当于dataSource
    subCategorys:[], //二级分类列表
    parentId:'0', //当前需要显示的分类列表的父分类parentId
    parentName:'', //当前需要显示的分类列表的父分类名称
    showStatus:0, //标识添加/更新的确认框是否显示， 0：都不显示， 1：显示添加， 2：显示更新
  }
  
  /*初始化Table所有列的数组*/
  initColumns=()=>{
    this.columns = [
      {
        title: '地址',
        dataIndex: 'address', //显示数据对应的属性名
        key: 'address',
      },
      {
        title: '操作',
        width:300,
        render:(category)=>( //返回需要显示的界面标签
          <span>
            <LinkButton onClick={()=>this.showUpdate(category)}>修改地址</LinkButton>
            {/*如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据*/}
            {this.state.parentId==='0' ? <LinkButton onClick={()=>this.showSubCategorys(category)}>查看子地址</LinkButton> : null}
            
          </span>
        )
      
      },
    ];
  }
  /*异步获取一级/二级分类列表显示
  * parentId:如果没有指定根据状态中的parentId请求，如果指定了根据指定的请求
  * */
  getCategorys=async (parentId)=>{
    //在发请求前，显示loading
    this.setState({loading:true})
    parentId=parentId || this.state.parentId
    /*发异步ajax请求，获取数据*/
    const result=await reqCategorys(parentId)
    //请求完成后，隐藏loading
    this.setState({loading:false})
    if (result.status===0){
      //取出分类数组（可能是一级也可能二级的）
      const categorys=result.data
      
      if (parentId==='0'){
        //更新一级分类状态
        this.setState({categorys})
      }else {
        //更新二级分类状态
        this.setState({subCategorys:categorys})
      }
      
    }else {
      message.error('获取分类列表失败')
    }
  }
  /*显示指定一级分类对象的二级子列表*/
  showSubCategorys=(category)=>{
    //更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    },()=>{ //在状态更新且重新render（）后执行
      console.log('parentId',this.setState.parentId) //'0'
      //获取二级分类列表显示
      this.getCategorys()
    })
    //setState()不能立即获取最新的状态：因为setState（）是异步更新状态的
    //console.log('parentId',this.setState.parentId) //'0'
  }
  /*显示指定一级分类列表*/
  showCategorys=()=>{
    //更新为显示一列表状态
    this.setState({
      parentId:'0',
      parentName:'',
      subCategorys:[]
    })
  }
  /*响应点击取消：隐藏确定框*/
  handleCancel=()=>{
    //清除输入数据
    //this.form.resetFields()
    //隐藏确认框
    this.setState({
      showStatus:0,
    })
  }
  /*显示添加的确认框*/
  showAdd=()=>{
    this.setState({
      showStatus:1,
    })
  }
  /*添加分类*/
  addCategory=()=>{
    this.form.validateFields(async (err,values)=>{
      if (!err){
        //隐藏确认框
        this.setState({
          showStatus:0
        })
  
        //收集数据，并提交添加分类的请求
        const {parentId,categoryName}=values
        //清除输入数据
        //this.form.resetFields()
        const result=await reqAddCategory(categoryName,parentId)
        if (result.status===0){
          //添加的分类是当前分类列表下的分类
          if (parentId===this.state.parentId){
            //重新获取当前分类列表显示
            this.getCategorys()
          }else if(parentId==='0'){ //在二级分类表下添加一级分类，重新获取一级分类列表，但不需要显示一级列表
            this.getCategorys('0')
          }
    
        }
      }
      
    })
  }
  /*显示修改的确认框*/
  showUpdate=(category)=>{
    //保存分类对象
    this.category=category
    //更新状态
    this.setState({
      showStatus:2,
    })
  }
  
  /*更新分类*/
  updateCategory=()=>{
    console.log('updateCategory()')
    //进行表单验证，只有通过了才处理
    this.form.validateFields(async (err,values)=>{
      if (!err){
        //1.隐藏确定框
        this.setState({
          showStatus:0,
        })
  
        //准备数据
        const categoryId=this.category._id
        const {categoryName}=values
        //清除输入数据
        //this.form.resetFields()
  
        //2.发请求更新分类
        // const result=await reqUpdateCategory({categoryId,categoryName})
        // if (result.status===0){
        //   //3.重新显示列表
        //   this.getCategorys()
        // }
      }
    })
    
    
  }
  
  /*为第一次render（）准备数据*/
  componentWillMount() {
    this.initColumns()
  }
  /*执行异步任务：发异步ajax请求*/
  componentDidMount() {
    //获取一级分类列表显示
    this.getCategorys()
  }
  
  render() {
    
    //读取状态数据
    const {categorys,subCategorys,parentId,parentName,loading,showStatus}=this.state
    //读取指定的分类
    const category=this.category || {} //如果还没有指定一个空对象
    
    //card 左侧
    const title=parentId==='0' ? '一级分类列表' : (
      <span>
        <linkButton onClick={this.showCategorys} style={{cursor: 'pointer'}}>一级分类列表</linkButton>
        <ArrowRightOutlined style={{marginRight:5}} />
        <span>{parentName}</span>
      </span>
    )
    //card 右侧
    const extra=(
      <Button type='primary' onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    )
  
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园108号',
      },
      {
        key: '3',
        name: '胡杏儿',
        age: 12,
        address: '东湖区湖底公园11号',
      },
      {
        key: '4',
        name: '张三',
        age: 22,
        address: '东城区北海公园2号',
      },
      {
        key: '5',
        name: '李四',
        age: 52,
        address: '海淀区中关村8号',
      },
      {
        key: '6',
        name: '白给',
        age: 32,
        address: '宝山区宁靖路25号',
      },
      {
        key: '7',
        name: '王五',
        age: 42,
        address: '嘉定区红石路1569号',
      },
      {
        key: '8',
        name: '赵二',
        age: 12,
        address: '浦东新区36号',
      },
      {
        key: '9',
        name: '孙政',
        age: 22,
        address: '静安区众川路56号',
      },
      {
        key: '10',
        name: '汩汩',
        age: 52,
        address: '青山区陆家嘴8号',
      },
      {
        key: '11',
        name: '欧阳克',
        age: 32,
        address: '汉口区长江二桥',
      },
      {
        key: '12',
        name: '关羽',
        age: 42,
        address: '江岸区长江大桥',
      },
      {
        key: '13',
        name: '张飞',
        age: 12,
        address: '武昌区解放路16号',
      },
      {
        key: '14',
        name: '刘备',
        age: 22,
        address: '朝阳区人民路23号',
      },
      {
        key: '15',
        name: '孙尚香',
        age: 45,
        address: '西城区大安路12号',
      },
      {
        key: '16',
        name: '大乔',
        age: 30,
        address: '汉阳区中心大道18号',
      },
      {
        key: '17',
        name: '吕布',
        age: 26,
        address: '阳逻区第二中学',
      },
      {
        key: '18',
        name: '貂蝉',
        age: 18,
        address: '汉口区解放大道18号',
      },
      {
        key: '19',
        name: '孙权',
        age: 16,
        address: '朝阳区烟袋斜街99号',
      },
      {
        key: '20',
        name: '小乔',
        age: 33,
        address: '黄陂区长安大道111号',
      },
    ];
  
    
    
    return (
      <Card title={title} extra={extra}>
        {/*如果为服务器传值，{dataSource}需修改为{parentId==='0'?categorys : subCategorys} {false}需改为{loading}*/}
        <Table
          bordered rowKey='key'
          dataSource={dataSource}
          columns={this.columns}
          loading={false}
          pagination={{defaultPageSize:5,showQuickJumper:true}}
        />
  
        <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
          <AddForm categorys={categorys} parentId={parentId} setForm={(form)=>{this.form=form}} />
        </Modal>
  
        <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
          {/*需要将dataSource.name改为category.name*/}
          <UpdateForm categoryName={dataSource.name} setForm={(form)=>{this.form=form}}/>
        </Modal>
      </Card>
    )
  }
}
