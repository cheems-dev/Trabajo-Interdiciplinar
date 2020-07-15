import React from "react";
import ButtonGoogle from "../components/ButtonGoogle";
import FormTeacher from "../components/FormTeacher";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Login = () => {
  return (
    <Container>
      <Row>
        <FormTeacher />
        <ButtonGoogle />
      </Row>
    </Container>
  );
};

export default Login;
