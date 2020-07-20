import React from "react";
import Col from "react-bootstrap/Col";
import Files from "./Files";
import { Link } from "react-router-dom";

import './css/Column.css';


const ListFiles = () => {
  return (
    <Col className="ColumnFolder" md={6}>
      <div className="divBox">
        <Link  to="/content">
          <Files  title="Primer año" />
        </Link>
      </div>
      <div className="divBox">
        <Link  to="/content">
          <Files  title="Segundo año" />
        </Link>
      </div>
      <div className="divBox">
        <Link  to="/content">
          <Files  title="Tercer año" />
        </Link>
      </div>
      <div className="divBox">
        <Link  to="/content">
          <Files  title="Cuarto año" />
        </Link>
      </div>
      <div className="divBox">
        <Link  to="/content">
          <Files  title="Quinto año" />
        </Link>
      </div>

    </Col>
  );
};

export default ListFiles;
