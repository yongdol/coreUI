import React, {Component} from 'react';
import {Button, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import './style.css'
import {toInteger} from "lodash";
import {translate} from "react-i18next";


class RenderCateCard extends Component {
  constructor(props) {
    super(props);
    this.goDetail = this.goDetail.bind(this);
    this.goMyData = this.goMyData.bind(this);
  }


  goDetail(service_id, h) {
    h.push("/service/" + service_id)
  }

  goMyData(service_id, h) {
    // console.log('service_id', service_id);
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
                          <CardBlock>
                            {service_name}<br/>
                            {service_brief}
                          </CardBlock>
                          <div className="card-button-box ">
                            <Button color="success" className="card-hover-down-button float-right"
                                    onClick={() => this.goDetail(service_id, history)}>{t('btn.detail')}</Button>
                            <Button color="success" className="card-hover-down-button float-right"
                                    onClick={() => this.goMyData(service_id, history)}>{t('btn.mydata')}</Button>
                          </div>
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
