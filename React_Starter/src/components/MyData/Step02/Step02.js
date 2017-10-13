import React, {Component} from 'react';
import {Button, Card, CardBlock, CardHeader, Col, Row, Table} from "reactstrap";
import {translate} from "react-i18next";
import '../Step01/style.css'


class Step02 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server_response: "",
            file_name_1: "",
            file_name_2: ""
        };
    }

    goNext() {
        this.props.history.push("/cxo/step03")
    }

    goHome() {
        this.props.history.push("/cxo")
    }

    render() {
        const { t, history, location } = this.props;
        console.log('location', location.state.res);
        console.log('location', location.state.file1);
        if (sessionStorage.getItem('access_token')) {
            return (
                <div className="contents animated fadeIn">
                    <div className="wrap">
                        <div className="front-img-step-2-1">
                            <img className="frontImg-l" src="img/fileupload/front-img-step-2-1.png" />
                            <img className="frontImg-s" src="img/fileupload/front-img-step-2-1-s.png" />
                        </div>
                        <Card>
                            <CardHeader className="step2-title-color">
                                step02. 확인
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>{t('title.file_name')}</th>
                                        <th>상태</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{t('title.sales_data')}</td>
                                        <td>
                                            {
                                                location.state.file1.map((item, key) => {
                                                        console.log('item', item.name);
                                                        return (
                                                            <p>
                                                                {item.name}
                                                            </p>
                                                        )
                                                    })
                                            }
                                        </td>
                                        <td>
                                            {location.state.res}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('title.promo_data')}</td>
                                        <td>
                                            {
                                                location.state.file2.map((item, key) => {
                                                    console.log('item', item.name);
                                                    return (
                                                        <p>
                                                            {item.name}
                                                        </p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            {location.state.res}
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBlock>
                            <Row>
                                <Col xs="4">
                                    <Button className="step2-title-color" size="sm" block onClick={history.goBack}>
                                        {t('btn.back')}
                                    </Button>
                                </Col>
                                <Col xs="4">
                                    <Button className="step2-title-color" size="sm" block onClick={this.goHome.bind(this)}>
                                        {t('btn.home')}
                                    </Button>
                                </Col>
                                <Col xs="4">
                                    <Button className="step2-title-color" size="sm" block onClick={this.goNext.bind(this)}>
                                        {t('btn.next')}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            );
        }

    }
}


export default translate('translations')(Step02);
