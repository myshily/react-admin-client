import React,{Component} from 'react'
import { Card, List} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import detailImg from '../../assets/images/5.jpeg'
import LinkButton from "../../components/link-button/link-button";
import {BASE_IMG_URL} from "../../utils/constants";
import {reqCategory} from "../../api";

const Item=List.Item

/*Product的详情子路由组件*/
export default class ProductDetail extends Component{
  
  state={
    cName1:'', //一级分类名称
    cName2:'', //二级分类名称
  }
  
  async  componentDidMount() {
    //得到当前商品的分类ID  如果服务器请求接口可用 需将以下注释取消 和if的/**/大注释取消 if else中间的注释不用动
  //  const {pCategoryId,categoryId}=this.props.location.state.product
    /*if (pCategoryId==='0'){ //一级分类下的商品
        const result=await reqCategory(categoryId)
        const cName1=result.data.name
        this.setState({cName1})
    }else { //二级分类下的商品
      /!*
      //通过多个await方式发多个请求：后面一个请求是在前一个请求成功返回之后才发送 这是不用的方法不要取消注释
      //const result1=await reqCategory(pCategoryId) //获取一级分类列表
      //const result2=await reqCategory(categoryId) //获取二级分类
      //const cName1=result1.data.name
      //const cName2=result2.data.name
      *!/
      
      //一次性发送多个请求，只有都成功了，才正常处理
      const results=await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      const cName1=results[0].data.name
      const cName2=results[1].data.name
      this.setState({
        cName1,cName2
      })
    }*/
  }
  
  render() {
    
    //读取携带过来的state数据 如服务器请求接口，接口可用需取消以下注释
    //const {name,desc,price,detail,imgs}=this.props.location.state.product
    const {cName1,cName2}=this.state
    const title=(
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{marginRight:10,fontSize:20}}
            onClick={()=>this.props.history.goBack()}
          />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          {/*如服务器请求接口，接口可用需取消Item下的第二个span的注释*/}
          <Item>
            <span className="left">商品名称：</span>
            {/*<span>{name}</span>*/}
            <span>联想ThinkPad 翼480</span>
          </Item>
          <Item>
            <span className="left">商品描述：</span>
            {/*<span>{desc}</span>*/}
            <span>年度重量级新品，X390、T490全新登场 更加轻薄机身设计</span>
          </Item>
          <Item>
            <span className="left">商品价格：</span>
            {/*<span>{price}元</span>*/}
            <span>66000元</span>
          </Item>
          <Item>
            <span className="left">所属分类：</span>
            {/*<span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>*/}
            <span>电脑 --> 笔记本</span>
          </Item>
          <Item>
            <span className="left">商品图片：</span>
            <span>
             {/* {
                imgs.map(img=>(
                  <img
                    key={img}
                    src={BASE_IMG_URL+img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }*/}
              <img
                className="product-img"
                src={detailImg}
                alt="img"
              />
              <img
                className="product-img"
                src={detailImg}
                alt="img"/>.
              
            </span>
          </Item>
          <Item>
            <span className="left">商品详情：</span>
            {/*<span dangerouslySetInnerHTML={{__html:detail}}></span>*/}
            <span dangerouslySetInnerHTML={{__html:'<h1 style="color: red">商品详情的内容标题</h1>'}}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
