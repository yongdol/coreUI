import React, {Component} from "react";
import {Container, Row, Col, Card, CardBlock, CardFooter, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

class Register extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBlock className="card-body p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  {/*<InputGroup className="mb-3">*/}
                    {/*<InputGroupAddon><i className="icon-user"></i></InputGroupAddon>*/}
                    {/*<Input type="text" placeholder="Username"/>*/}
                  {/*</InputGroup>*/}
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
                  <Button color="success" block>Create Account</Button>
                </CardBlock>
                <CardFooter className="p-4">
                  {/*<Row>*/}
                    {/*<Col xs="12" sm="6">*/}
                      {/*<Button className="btn-facebook" block><span>facebook</span></Button>*/}
                    {/*</Col>*/}
                    {/*<Col xs="12" sm="6">*/}
                      {/*<Button className="btn-twitter" block><span>twitter</span></Button>*/}
                    {/*</Col>*/}
                  {/*</Row>*/}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
