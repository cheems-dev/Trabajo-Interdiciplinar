import React from "react";
import FormFile from "../components/FormFile";
import ListFiles from "./ListFiles";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Home() {
  return (
    <Container>
      <Row>
        <FormFile />
        <ListFiles />
      </Row>
    </Container>
  );
}

export default Home;
