import React, {Component} from 'react';
import {Button, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import './style.css'
import {translate} from "react-i18next";


class RenderCateCard extends Component {

  goDetail(service_id, h) {
    h.push("/service/" + service_id)
  }

  goMyData(service_id, h) {
    h.push("/report/new/step01/" + service_id)
  }

  renderCateHead(data, history, t) {
    return data.map((item, i) => {
      return (
        <Col key={i} lg="12">
          <Card className="card-accent-success">
            <CardHeader>
              {item[0]['category_name']}
            </CardHeader>
            <CardBlock>
              <Row>
                {
                  item.map((item2, i) => {
                    const service_id = item2.id;
                    const service_name = item2.service_name;
                    const service_brief = item2.service_brief;
                    return (
                      <Col lg="4" key={i}>
                        <Card className="card-container">
                          <CardBlock className="card-padding-right">
                            {service_name}<br/>
                            {service_brief}
                            <Button id="btn1" className="hidden-btn" size="sm" color="success"
                                    onClick={() => this.goDetail(service_id, history)}>
                              <i className="fa fa-file-text-o fa-lg icon-right-margin"></i>{t('btn.detail')}
                            </Button>
                            <Button id="btn2" className="hidden-btn" size="sm" color="success"
                                    onClick={() => this.goMyData(service_id, history)}>
                              <i className="fa fa-pencil fa-lg icon-right-margin"></i>{t('btn.mydata')}
                            </Button>
                          </CardBlock>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            </CardBlock>
          </Card>
        </Col>
      )
    })
  }

  render() {
    const {data, history, t} = this.props;
    return (
      <Row>
        {this.renderCateHead(data, history, t)}
      </Row>
    );
  }
}

  export default translate('translations')(RenderCateCard);
