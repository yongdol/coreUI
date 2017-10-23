import React, {Component} from 'react';
import '../Step01/style.css'
import {translate} from "react-i18next";
import {Button, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";

class Step04 extends Component {

    goHome() {
        this.props.history.push("/cxo")
    }

    render() {
        const { t, history } = this.props;
        return (
            <div className="contents animated fadeIn">
                <div className="wrap">
                    <div className="front-img-step-4-1">
                        <img className="frontImg-l" src="img/fileupload/front-img-step-4-1.png" />
                        <img className="frontImg-s" src="img/fileupload/front-img-step-4-1-s.png" />
                    </div>
                    <Card>
                        <CardHeader className="step4-title-color">
                            step04. 완료
                        </CardHeader>
                        <CardBlock className="card-body">

                        </CardBlock>
                        <Row>
                            <Col xs="6">
                                <Button outline className="step4-title-color" size="sm" block onClick={history.goBack}>
                                    {t('btn.back')}
                                </Button>
                            </Col>
                            <Col xs="6">
                                <Button outline className="step4-title-color" size="sm" block onClick={this.goHome.bind(this)}>
                                    {t('btn.home')}
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}


export default translate('translations')(Step04);
