/*用来指定商品详情的富文本编辑器组件*/
import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), //创建一个没有内容的编辑对象
  }
  
  /* 输入过程中实时回调**/
  onEditorStateChange= (editorState) => {
    console.log('onEditorStateChange()')
    this.setState({
      editorState,
    });
  };
  
  getDetail=()=>{
    // 返回输入数据对应的HTML格式的文本
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  
  render() {
    const { editorState } = this.state;
    return (
     
        <Editor
          editorState={editorState}
          editorStyle={{border:'1px solid black',minHeight:200,paddingLeft:10}}
          onEditorStateChange={this.onEditorStateChange}
        />
        
      
    );
  }
}
