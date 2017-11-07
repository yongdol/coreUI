import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Col} from "reactstrap";

class RenderTable extends Component {

  renderCol(item, type, style) {
    if (this.props.job_id !== "4") {
      switch (type) {
        case 'th':
          return <th>{item}</th>;
        case 'td':
          return <td>{item}</td>;
      }
    } else {
      const img_tag = item.split('<div>')[1];
      if (img_tag) {
        switch (type) {
          case 'th':
            return <th>{item}</th>;
          case 'td':
            return <td dangerouslySetInnerHTML={{__html: img_tag}}></td>;
        }
      } else {
        switch (type) {
          case 'th':
            return <th>{item}</th>;
          case 'td':
            return <td>{item}</td>;
        }
      }
    }
  }

  renderRow(obj) {
    const answer = [];
    for (const key in obj) {
      if (key === '0') {
        continue
      } else {
        answer.push(
          <tr>
            {obj[key].map((item) => this.renderCol(item, 'td'))}
          </tr>
        );
      }
    }
    return answer;
  }

  render() {
    if (this.props.outline) {
      return (
        <Col lg={this.props.grid}>
          <h1></h1>
          <h2 className="report-h2">{this.props.title}</h2>
          <Table bordered condensed hover>
            <thead>
            <tr>
              {this.props.tab[0].map((x) => (this.renderCol(x, "th")))}
            </tr>
            </thead>
            <tbody>
            {this.renderRow(this.props.tab)}
            </tbody>
          </Table>
        </Col>
      );
    } else {
      return (
        <Col lg={this.props.grid}>
          <h1></h1>
          <h2 className="report-h2">{this.props.title}</h2>
          <Table bordered condensed hover>
            <thead>
            <tr>
              {this.props.tab[0].map((x) => (this.renderCol(x, "th")))}
            </tr>
            </thead>
            <tbody>
            {this.renderRow(this.props.tab)}
            </tbody>
          </Table>
        </Col>
      )
    }
  }
}


export default RenderTable;


