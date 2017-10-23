import React, {Component} from 'react';
import {Col} from "reactstrap";
import Markdown from 'react-remarkable'
import marked from "marked";


class MarkdownContent extends Component {
    render() {
        const {obj, grid, i} = this.props;
        const codes = obj.markdown;
        if (obj.outline === "true") {
            return (
                <Col lg={grid}>
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
