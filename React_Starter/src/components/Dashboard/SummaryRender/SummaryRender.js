import React, {Component} from 'react';
import {Bar} from "react-chartjs-2";
import {Badge, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";

class SummaryRender extends Component {
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
        return (
            <Col lg="6" xs="12">
                <Link to={"/cxo/analysis/" + this.props.job_id} style={style.link}>
                    <Card className="card-accent-success">
                        <CardHeader>
                            <i className="fa fa-bar-chart"></i>
                            프로모션 푸시풀
                            <Badge color="success" className="float-right">Result</Badge>
                        </CardHeader>
                        <Row>
                            <CardBlock className="card-body col-6">
                                <div>
                                    <div className="chart-wrapper">
                                        <Bar data={this.props.graph}
                                             options={{
                                                 maintainAspectRatio: false,
                                                 animation: {
                                                     duration : 3000
                                                 }
                                             }}
                                        />
                                    </div>
                                </div>
                            </CardBlock>
                            <CardBlock className="col-6">
                                {
                                    this.props.desc.map((item) => {
                                        if (item.keyname === "") {
                                            return (
                                                <div>
                                                    <p>{item.value}</p>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div>
                                                    <p>{item.keyname} : {item.value}</p>
                                                </div>
                                            )
                                        }

                                    })
                                }
                            </CardBlock>
                        </Row>
                    </Card>
                </Link>
            </Col>
        );
    }
}


export default SummaryRender;