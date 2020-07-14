import React from "react";
import Col from "react-bootstrap/Col";
import Files from "../components/Files";
import { Link } from "react-router-dom";

const ListFiles = () => {
  return (
    <Col md={6}>
      <Link to="/content">
        <Files title="Primer año" />
      </Link>
      <Files title="Segundo año" />
      <Files title="Tercer año" />
      <Files title="Cuarto año" />
      <Files title="Quinto año" />
    </Col>
  );
};

export default ListFiles;
