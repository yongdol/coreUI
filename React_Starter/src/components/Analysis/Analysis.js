import React, {Component} from 'react';
import BACKEND_URL from "../../utils/config";
import axios from 'axios';
import Contents from "./Contents";
import {Badge, Button, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import ToMyDataButton from "./ToMyDataButton";
import {translate} from "react-i18next";


class Analysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            render_error: "",
        };
    }

    componentDidMount() {
        this.getDetailReport(this.props.match.params.job_id)
    }


    getDetailReport(job_id) {
        const token = sessionStorage.getItem("access_token");
        const locale = this.props.i18n.language;
        return axios.get(BACKEND_URL + "/detail_report",{
            headers: {
                "Authorization": token
            },
            params: {
                job_id: job_id? job_id : this.props.match.params.job_id,
                locale: locale
            }
        }).then((res) => {
            this.setState({data: res.data.data.slice(0, 10)})
        }).catch((res) => {
            console.log('error', res );
            // let result = res.response.data.e_msg.message;
            // this.setState({render_error: result});
        });
    }

    render() {
        if (this.state.data) {
            let data = eval('(' + this.state.data[0]['big_json'] + ')');
            let append = [];
            const scheme = data.body.map((item, i)  => {
                if (item.layout_column_append){
                    append.push(item.layout_column_append)
                } else {
                    append = [];
                    append.push(item.layout_column_append);
                }
                return append;
            });
            // console.log('scheme', scheme );
            const sampleAnalysis = (
                <div>
                    <Card className="card-accent-danger">
                        <CardHeader>
                            {data.title}
                            <Badge color="danger" className="float-right">Sample</Badge>
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                            {data.body.map((obj, i) =>
                                <Contents
                                    obj={obj}
                                    scheme={scheme}
                                    ind={i}
                                    job_id={this.props.match.params.job_id}
                                />
                            )}
                            </Row>
                        </CardBlock>
                        <ToMyDataButton />
                    </Card>
                </div>
            );

            const Analysis = (
                <div>
                    <Card className="card-accent-success">
                        <CardHeader>
                            {data.title}
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                {data.body.map((obj, i) =>
                                    <Contents
                                        obj={obj}
                                        scheme={scheme}
                                        ind={i}
                                        job_id={this.props.match.params.job_id}
                                    />
                                )}
                            </Row>
                        </CardBlock>
                        <ToMyDataButton />
                    </Card>
                </div>
            );
            if (this.props.match.params.job_id === "1" || this.props.match.params.job_id === "2" ||
                this.props.match.params.job_id === "3" || this.props.match.params.job_id === "4" ||
                this.props.match.params.job_id === "5"){
                return sampleAnalysis
            } else {
                return Analysis
            }
        }
        else {
            return (
                <div className="contents">
                    <h2>{this.state.e_msg}</h2>
                </div>
            );
        }
    }
}


export default translate('translations')(Analysis);
