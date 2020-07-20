import React, { useEffect, useState } from "react";
import SyllabusForm from "../components/SyllabusForm";
import { db } from "../firebase/index";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormFile from "./FormFile";
import Download from "./Download";
import { toast } from "react-toastify";

const Syllabus = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("Documento añadido", {
          type: "success",
          autoClose: 5000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Documento actualizado", {
          type: "info",
          autoClose: 5000,
        });
        setCurrentId("");
      }
    } catch (error) {
      toast(error, {
        type: "error",
        autoClose: 7000,
      });
    }
  };
  // Borramos la data :C
  const onDeleteLink = async (id) => {
    if (window.confirm("Estas seguro de borrar ?")) {
      await db.collection("links").doc(id).delete();
      toast("Documento removido", {
        type: "error",
        autoClose: 5000,
      });
    }
  };

  // Traer data
  const getLinks = async () => {
    await db.collection("links").onSnapshot((querySnapShot) => {
      const docs = [];
      querySnapShot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log(docs);
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <Container>
      <Row>
        <FormFile />
        <SyllabusForm {...{ addOrEditLink, currentId, links }} />
        {/*{<Download/>}*/}
      </Row>
      <Row>
        {links.map((link) => (
          <Col md={4} key={link.id}>
            <Modal.Dialog>
              <Modal.Header>
                <div className="d-flex justify-content-between">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <h4>{link.title}</h4>
                  </a>
                  <div>
                    <i
                      className="tiny material-icons"
                      onClick={() => setCurrentId(link.id)}
                    >
                      edit
                    </i>
                    <i
                      className="tiny material-icons text-danger"
                      onClick={() => onDeleteLink(link.id)}
                    >
                      close
                    </i>
                  </div>
                </div>
              </Modal.Header>

              <Modal.Body>
                <Button variant="outline-primary" size="sm">
                  {link.semester}
                </Button>
                {"   "}
                <Button variant="outline-success" size="sm">
                  {link.age} año
                </Button>
              </Modal.Body>
              {/* 
              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
              </Modal.Footer> */}
            </Modal.Dialog>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Syllabus;
