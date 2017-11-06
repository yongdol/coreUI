import React, {Component} from "react";
import {
  Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import axios from "axios";
import BACKEND_URL from "../../../utils/config";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render_error: "",
    };
    this.goRegister = this.goRegister.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  goRegister() {
    this.props.history.push("/cxo/register")
  }

  cancel() {
    this.props.history.goBack()
  }

  login(email, password) {
    const jsonData = {"email": email, "password": password};
    return axios.post(BACKEND_URL + "/signin", jsonData).then((res) => {
      if (res.data.e_msg.status === 200) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('access_token', res.data.access_token);
        this.props.history.push("/cxo/dashboard");
      } else {
        const result = res.data.e_msg.message;
        this.setState({render_error: result});
      }
    }).catch((res) => {
      let result = res.response.data.e_msg.message;
      this.setState({render_error: result});
    })
  }

  render() {
    const style = {
      error_color: {
        color: 'Red'
      },
      cancel_btn: {
        float: 'right'
      }
    };
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Button className="btn-sm" color="link" style={style.cancel_btn}>
                <i className="fa fa-times fa-lg mt-4" onClick={this.cancel}/>
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>@</InputGroupAddon>
                      <Input type="email" aria-label="EMAIL" name="email" id="email"
                             placeholder="EMAIL"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" aria-label="PASSWORD" name="password" id="password"
                             placeholder="PASSWORD"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4"
                                onClick={() => this.login(document.getElementById('email').value,
                                  document.getElementById('password').value)}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <p style={style.error_color}>{this.state.render_error}</p>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                  <CardBlock className="card-body text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Join Sentience</p>
                      <Button color="primary" className="mt-3" active onClick={this.goRegister}>Register Now!</Button>
                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
