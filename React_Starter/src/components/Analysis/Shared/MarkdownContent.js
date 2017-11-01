import React, {Component} from 'react';
import {Col} from "reactstrap";
import Markdown from 'react-remarkable'
import '../style.css'

class MarkdownContent extends Component {
  render() {
    const {obj, grid, i} = this.props;
    const codes = obj.markdown;
    console.log('obj', obj);
    if (obj.outline) {
      console.log('hihi');
      return (
        <Col lg={grid} className="border-box">
          <h2>{obj.title}</h2>
          <Markdown source={codes} options={{html: true}} className="markdown-text"/>
        </Col>
      )
    } else {
      return (
        <Col lg={grid}>
          <h2>{obj.title}</h2>
          <Markdown source={codes} options={{html: true}} className="markdown-text"/>
        </Col>
      )
    }
  }
}


export default MarkdownContent;
