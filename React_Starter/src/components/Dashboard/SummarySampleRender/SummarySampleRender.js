import React, {Component} from 'react';
import {Card, CardBlock, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import RenderModal from "../Shared/RenderModal";
import RenderSummaryGraph from "../Shared/RenderSummaryGraph";
import {translate} from "react-i18next";

class SummaryRender extends Component {
  constructor(props) {
    super(props);
    this.goDetail = this.goDetail.bind(this);
  }

  goDetail(job_id, h) {
    h.push("cxo/analysis/" + job_id)
  }

  render() {
    const style = {
      text_center: {
        textAlign: 'center'
      },
      title_font: {
        fontSize: '0.8rem'
      },
      set_footer: {
        position: 'absolute',
        bottom: '2px',
        width: '92%',
        textAlign: 'center',
      },
      link: {
        color: '#151b1e'
      },
      min_width: {
        minWidth: '300px'
      },
      div_center: {
        display: 'table',
        margin: 'auto'
      }
    };

    const {service_id, service_name, service_brief, job_id, report_name, graph, info_html, history, t} = this.props;
    if (graph === "null" && info_html !== "null") {
      return (
        <Col lg="6" sm="12" xs="12">
          <Card className="card-accent-danger">
            <RenderModal
              service_id={service_id}
              service_name={service_name}
              service_brief={service_brief}
              report_name={report_name}
              history={history}
            />
            <Row>
              <CardBlock className="col-12">
                <Link to={"/cxo/analysis/" + job_id} style={style.link}>
                  <div dangerouslySetInnerHTML={{__html: info_html[0]['html']}}></div>
                </Link>
              </CardBlock>
            </Row>
          </Card>
        </Col>
      )
    } else if (graph === "null" && info_html === "null") {
      return (
        <Col lg="6" sm="12" xs="12">
          <Card className="card-accent-danger">
            <RenderModal
              service_id={service_id}
              service_name={service_name}
              service_brief={service_brief}
              report_name={report_name}
              history={history}
            />
            <Row>
              <CardBlock>
                <div>{t('error.parsing')}</div>
              </CardBlock>
            </Row>
          </Card>
        </Col>
      )
    } else {
      return (
        <Col lg="6" sm="12" xs="12">
          <Card className="card-accent-danger">
            <RenderModal
              service_id={service_id}
              service_name={service_name}
              service_brief={service_brief}
              report_name={report_name}
              history={history}
            />
            <Row>
              <CardBlock className="card-body col-lg-8 col-sm-12">
                <div className="chart-wrapper" style={style.min_width}>
                  {
                    graph.map((item, i) => {
                      return (
                        <RenderSummaryGraph
                          type={item.type}
                          data={item.data}
                          options={item.options}
                          key={i}
                        />
                      )
                    })
                  }
                </div>
              </CardBlock>
              <CardBlock className="col-lg-4 col-sm-12" style={style.div_center}>
                <Link to={"/cxo/analysis/" + job_id} style={style.link}>
                    <div dangerouslySetInnerHTML={{__html: info_html[0]['html']}}></div>
                </Link>
              </CardBlock>
            </Row>
          </Card>
        </Col>
      )
    }
  }


}


export default translate('translations')(SummaryRender);
