import React, {Component} from 'react';
import {Col} from "reactstrap";
import Markdown from 'react-remarkable'
import '../style.css'

class MarkdownContent extends Component {
  render() {
    const {obj, grid, i} = this.props;
    const codes = obj.markdown;
    if (obj.outline) {
      return (
        <Col lg={grid} md={grid} sm={grid} xs={grid} className="border-box" key={i}>
          <h2>{obj.title}</h2>
          <Markdown source={codes} options={{html: true}} className="markdown-text"/>
        </Col>
      )
    } else {
      return (
        <Col lg={grid} md={grid} sm={grid} xs={grid} key={i}>
          <h2>{obj.title}</h2>
          <Markdown source={codes} options={{html: true}} className="markdown-text"/>
        </Col>
      )
    }
  }
}


export default MarkdownContent;
