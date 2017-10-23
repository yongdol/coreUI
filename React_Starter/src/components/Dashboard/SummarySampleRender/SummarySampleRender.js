import React, {Component} from 'react';
import {Card, CardBlock, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import RenderModal from "../Shared/RenderModal";
import RenderSummaryGraph from "../Shared/RenderSummaryGraph";

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
            text_center : {
                textAlign : 'center'
            },
            title_font : {
                fontSize : '0.8rem'
            },
            set_footer : {
                position: 'absolute',
                bottom: '2px',
                width: '92%',
                textAlign: 'center',
            },
            link : {
                color: '#151b1e',

            }
        };
        // console.log('info', this.props.graph);
        const {service_id, service_name, service_text, job_id, report_name, graph, info, history} = this.props;
        if(graph === "null") {
            return (
                <Col lg="6" sm="12" xs="12">
                    <Card className="card-accent-danger">
                        <RenderModal
                            service_id={service_id}
                            service_name={service_name}
                            service_text={service_text}
                            report_name={report_name}
                            history={history}
                        />
                        <Row>
                            <CardBlock className="col-12">
                                <Link to={"/cxo/analysis/" + job_id} style={style.link}>
                                    {
                                        info.map((item, i) => {
                                            if (item.keyname === "") {
                                                return (
                                                    <div key={i}>
                                                        <p>{item.value}</p>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={i}>
                                                        <p>{item.keyname} : {item.value}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </Link>
                            </CardBlock>
                        </Row>
                    </Card>
                </Col>
            );
        } else {
            return (
                <Col lg="6" sm="12" xs="12">
                    <Card className="card-accent-danger">
                        <RenderModal
                            service_id={service_id}
                            service_name={service_name}
                            service_text={service_text}
                            report_name={report_name}
                            history={history}
                        />
                        <Row>
                            <CardBlock className="card-body col-6">
                                <div>
                                    <div className="chart-wrapper">
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
                                </div>
                            </CardBlock>
                            <CardBlock className="col-6">
                                <Link to={"/cxo/analysis/" + job_id} style={style.link}>
                                    {
                                        info.map((item, i) => {
                                            if (item.keyname === "") {
                                                return (
                                                    <div key={i}>
                                                        <p>{item.value}</p>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={i}>
                                                        <p>{item.keyname} : {item.value}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </Link>
                            </CardBlock>
                        </Row>
                    </Card>
                </Col>
            )
        }

    }
}


export default SummaryRender;
