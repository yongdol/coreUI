import React, {Component} from 'react';
import {Bar, Pie} from "react-chartjs-2";
import {Badge, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";

class SummaryRender extends Component {

    summaryGraph(graphType) {
        switch (graphType) {
            case "bar" :
                return (
                    <Bar data={this.props.graph_data}
                         options={{
                             maintainAspectRatio: false,
                             animation: {
                                 duration : 2000
                             }
                         }}
                    />
                );

            case "pie" :
                return (
                    <Pie data={this.props.graph_data}
                         options={{
                             maintainAspectRatio: false,
                             animation: {
                                 duration : 2000
                             }
                         }}
                    />
                );
            default :
                return (
                    <div>
                        Error!
                    </div>
                )
        }
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

        return (
            <Col lg="6" sm="12" xs="12">
                <Link to={"/cxo/analysis/" + this.props.job_id} style={style.link}>
                    <Card className="card-accent-danger">
                        <CardHeader>
                            <i className="fa fa-bar-chart"></i>
                            알고리즘이름?설명?어떤분석인지?
                            <Badge color="danger" className="float-right">Sample</Badge>
                        </CardHeader>
                        <Row>
                            <CardBlock className="card-body col-6">
                                <div>
                                    <div className="chart-wrapper">
                                        {this.summaryGraph(this.props.graph_type)}
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
