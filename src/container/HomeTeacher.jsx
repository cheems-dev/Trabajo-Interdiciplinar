import React from "react";
import Container from "react-bootstrap/Container";
import ListFiles from "../components/ListFiles";
import FormFile from "../components/FormFile";
import Row from "react-bootstrap/Row";

function HomeTeacher() {
  return (
    <Container>
      <Row>
        <ListFiles />
        <FormFile />
      </Row>
    </Container>
  );
}

export default HomeTeacher;
