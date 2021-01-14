import React,{Component} from 'react'
import { Card, Select,Input,Button,Table,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from "../../components/link-button/link-button";
import {reqProducts,reqSearchProducts,reqUpdateStatus} from "../../api";
import {PAGE_SIZE} from "../../utils/constants";

const Option=Select.Option

/*Product的默认子路由组件*/
export default class ProductHome extends Component{
  
  state={
    total:0, //商品的总数量
    loading:false, //是否正在加载中
    searchName:'', //搜索的关键字
    searchType:'productName', //根据哪个字段搜索
    products:[ //数组内为测试页面显示效果数据，实际如接口可用需为空数组
      {
        "status":1,
        "_id":"01",
        "name":"联想ThinkPad 翼480",
        "desc":"年度重量级新品，X390、T490全新登场 更加轻薄机身设计",
        "price":66000,
        "pCategoryId":"001",
        "categoryId":"0001",
        "detail":"<p><span>1233556</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"02",
        "name":"华硕(ASUS) 飞行堡垒",
        "desc":"15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G",
        "price":6799,
        "pCategoryId":"002",
        "categoryId":"0002",
        "detail":"<p><span>889988</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"03",
        "name":"React的Table表格组件",
        "desc":"当有大量结构化的数据需要展现时；当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。",
        "price":100,
        "pCategoryId":"003",
        "categoryId":"0003",
        "detail":"<p><span>66666666</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"04",
        "name":"Context文档",
        "desc":"在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的",
        "price":11,
        "pCategoryId":"004",
        "categoryId":"0004",
        "detail":"<p><span>23333</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"05",
        "name":"Refs 转发文档",
        "desc":"Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧",
        "price":23,
        "pCategoryId":"005",
        "categoryId":"0005",
        "detail":"<p><span>123123123</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"06",
        "name":"深入 JSX文档",
        "desc":"实际上，JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。",
        "price":5,
        "pCategoryId":"006",
        "categoryId":"0006",
        "detail":"<p><span>555555555</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"07",
        "name":"gdhd",
        "desc":"jjkldmmlk",
        "price":1,
        "pCategoryId":"007",
        "categoryId":"0007",
        "detail":"<p><span>023153521</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"08",
        "name":"jfnnhno",
        "desc":"nnmgkm",
        "price":123,
        "pCategoryId":"008",
        "categoryId":"0008",
        "detail":"<p><span>548216561</span></p>",
        "__v":0
      },
      {
        "status":1,
        "_id":"09",
        "name":"nlbflrp",
        "desc":"ggdgltt",
        "price":99,
        "pCategoryId":"009",
        "categoryId":"0009",
        "detail":"<p><span>774895146784562</span></p>",
        "__v":0
      },
    ], //商品数组
  }
  
  /*初始化table的列的数组*/
  initColumns=()=>{
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>'￥'+price //当前指定了对应的属性，传入的是对应的属性值
      },
      {
        width:100,
        title: '状态',
       // dataIndex: 'status',
        render:(product)=>{
          const {status,_id}=product
          const newStatus=status===1 ? 2 : 1
          return (
            // 如果服务器请求接口可用 需将以下注释取消
            <span>
              {/*<Button type="primary" onclick={()=>this.updateStatus(_id,newStatus)}>{status===1 ? '下架' : '上架'}</Button>*/}
              <Button type="primary" onclick={()=>this.updateStatus(_id,newStatus)}>下架</Button>
              <span>在售</span>
              {/*<span>{status===1 ? '在售' : '已下架'}</span>*/}
            </span>
          )
        }
      },
      {
        width:100,
        title: '操作',
        render:(product)=>{
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }
  
  /*获取指定页码的列表数据显示*/
  getProducts=async (pageNum)=>{
    this.pageNum=pageNum //保存pageNum，让其它方法可以看到
    this.setState({loading:false}) //显示loading  接口正常应false改为true，现方便查看页面显示为false
    const {searchName,searchType} =this.state
    //如果搜索关键词有值，说明我们要做搜索分页
    let result
    if (searchName){
       result=reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
    }else { //一般分页请求
       result=await reqProducts(pageNum,PAGE_SIZE)
    }
    
    this.setState({loading:false}) //隐藏loading
    if(result.status===0){
      //取出分页数据，更新状态，显示分页列表
      const {total,list}=result.data
      this.setState({total,products:list})
    }
  }
  
  /*更新指定商品的状态*/
  updateStatus=async (productId,status)=>{
    const result=await reqUpdateStatus(productId,status)
    if(result.status===0){
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }
  
  componentWillMount() {
    this.initColumns()
  }
  
  componentDidMount() {
    this.getProducts(1)
  }
  
  render() {
    
    //取出状态数据
    const {products,total,loading,searchType,searchName}=this.state
    
    //dataSource数组就是服务器传值请求到的products:[],
    /*const dataSource = [
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
        address: '西湖区湖底公园1号',
      },
    ];*/
    
    const title=(
      <span>
        {/*服务器请求传值时，需将Select的value='1'改为value={searchType}
        Option的value='1'改为value='productName'
        Option的value='2'改为value='productDesc'
        */}
        <Select
          value={searchType}
          style={{width:150}}
          onChange={value => this.setState({searchType:value})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{width:150,margin:'0 15px'}}
          value={searchName}
          onChange={event => this.setState({searchName:event.target.value})}
        />
        <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )
    
    const extra=(
      <Button type="primary">
        <PlusOutlined />
        添加商品
      </Button>
    )
    
    return (
      <Card title={title} extra={extra}>
        {/*如果为服务器传值请求到的数组，dataSource={dataSource}改为dataSource={products}*/}
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize:PAGE_SIZE,
            showQuickJumper:true,
            onChange:this.getProducts
          }}
        />
      </Card>
    )
  }
}
