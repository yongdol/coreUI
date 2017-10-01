import React, {Component} from "react";
import {Container, Row, Col, Card, CardBlock, CardFooter, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import BACKEND_URL from "../../../../public/utils/config";
import axios from "axios"


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render_error: "",
        };
        this.cancel = this.cancel.bind(this);
    }

    cancel() {
        this.props.history.goBack()
    }


    register(email, password, password2) {
        const jsonData = {"email": email, "password": password, "password2": password2};
        return axios.post(BACKEND_URL + "/signup", jsonData).then((res) => {
            if (res.data.e_msg.status === 200) {
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('access_token', res.data.access_token);
                this.props.history.push("/dashboard")
            } else {
                const result = res.data.e_msg.message;
                this.setState({render_error: result});
            }
        }).catch((res) => {
            // console.log('resss', res.response.data.e_msg);
            let result = res.response.data.e_msg.message;
            this.setState({render_error: result})
        })
    }


    render() {
        const style = {
            error_color : {
                color: 'Red'
            },
            cancel_btn : {
                float: 'right'
            }
        };

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Button className="btn-sm" color="link" style={style.cancel_btn}>
                                <i className="fa fa-times fa-lg mt-4" onClick={this.cancel} />
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBlock className="card-body p-4">
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon>@</InputGroupAddon>
                                        <Input type="email" aria-label="EMAIL" name="email" id="email"
                                               placeholder="EMAIL"/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                        <Input type="password" aria-label="PASSWORD" name="password" id="password"
                                               placeholder="PASSWORD" className="password-input"/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                        <Input type="password" aria-label="PASSWORD2" name="password2" id="password2"
                                               placeholder="CONFIRM PASSWORD"/>
                                    </InputGroup>
                                    <Col xs="12">
                                        <p style={style.error_color}>{this.state.render_error}</p>
                                    </Col>
                                    <Button color="primary" onClick={() => this.register(
                                        document.getElementById('email').value,
                                        document.getElementById('password').value,
                                        document.getElementById('password2').value)
                                    } block>Create Account</Button>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Register;
