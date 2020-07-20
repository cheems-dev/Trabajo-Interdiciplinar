import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login(){
    return (
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Form>
                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.input></Form.input>
                </Form.Group>

                <Form.Group>
                  <Button onClick>Ingresar</Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      );
}

export default Login;