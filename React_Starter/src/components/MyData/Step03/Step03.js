import React, {Component} from 'react';
import {Button, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import {translate} from "react-i18next";
import axios from 'axios';
import '../Step01/style.css'
import BACKEND_URL from "../../../utils/config";
import RenderBadge from "./RenderBadge";
import RenderCardBlock from "./RenderCardBlock";


class Step03 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            job_id: null,
            wholeWaitTime: ''
        };
        this.waitingList = this.waitingList.bind(this);
    }


    componentDidMount() {
        this.waitingList();
        this.allWaitingTime();
        // this.allWaitingTime().then((res) => console.log('data', res.data.waiting_time_in_min ));
        // this.interval = setInterval(this.myWaitingTime, 3000)
    }

    waitingList() {
        const token = sessionStorage.getItem("access_token");
        const locale = this.props.i18n.language;
        return axios.get(BACKEND_URL + "/job_status_list", {
            headers: {
                "Authorization": token
            },
            params: {
                "locale": locale
            }
        }).then((res) => {
            this.setState({data:res.data.data})
        });
    }

    allWaitingTime() {
        const token = sessionStorage.getItem("access_token");
        return axios.get(BACKEND_URL + "/waiting_time")
            .then((res) => {
            this.setState({wholeWaitTime: res.data.waiting_time_in_min})
            })
    }

    goHome() {
        this.props.history.push("/cxo/sampledashboard")
    }

    goStep01() {
        this.props.history.push("/cxo/step01")
    }

    render() {
        const {t, history} = this.props;
        // console.log('data', history);
        if (this.state.data) {
            return (
                <div className="contents animated fadeIn">
                    <div className="wrap">
                        <div className="front-img-step-3-1">
                            <img className="frontImg-l" src="img/fileupload/front-img-step-3-1.png"/>
                            <img className="frontImg-s" src="img/fileupload/front-img-step-3-1-s.png"/>
                        </div>
                        <Card>
                            <CardHeader className="step3-title-color">
                                step03. 분석진행 ({t('title.total_min_time')} {this.state.wholeWaitTime} {t('title.minute')})
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Row>
                                    {
                                        this.state.data.map((item, i) => {
                                            let order = (i + 1).toString();
                                            // console.log('status', item.status);
                                            if(item.status !== "complete") {
                                                return (
                                                    <Col xs="12" sm="4" key={i}>
                                                        <RenderCardBlock status={item.status}
                                                                         start={item.try_started_at}
                                                                         service_name={item.service_name}/>
                                                    </Col>
                                                )
                                            } else {
                                                return (
                                                    <div>NULL</div>
                                                )
                                            }
                                        })
                                    }
                                </Row>
                            </CardBlock>
                            <Row>
                                <Col xs="12" lg="6">
                                    <Button className="border-round step3-title-color float-right margin-bottom" size="lg" onClick={this.goStep01.bind(this)}>
                                        {t('btn.backtostep01')}
                                    </Button>
                                </Col>
                                <Col xs="12" lg="6">
                                    <Button className="border-round step3-title-color margin-bottom" size="lg" onClick={this.goHome.bind(this)}>
                                        {t('btn.home')}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}


export default translate('translations')(Step03);
