import React, { useState, useEffect } from "react";
import { db } from "../firebase/index";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
const SyllabusForm = (props) => {
  const initialStateValues = {
    title: "",
    url: "",
    age: "",
    semester: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.url)) {
      return toast("Direccion invalida", { type: "error", autoClose: 4000 });
    }

    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <Col md={6}>
      <h1 className="text-center">Formulario</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ejm: Calculo en varias variables"
            name="title"
            onChange={handleInputChange}
            value={values.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Link del syllabus</Form.Label>
          <Form.Control
            type="text"
            // placeholder="https://www.google.com.mx"
            name="url"
            onChange={handleInputChange}
            value={values.url}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Selecciona el año</Form.Label>
          <Form.Control
            as="select"
            name="age"
            onChange={handleInputChange}
            value={values.age}
          >
            <option>Primero</option>
            <option>Segundo</option>
            <option>Tercero</option>
            <option>Cuarto</option>
            <option>Quinto</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Selecciona el semestre</Form.Label>
          <Form.Control
            as="select"
            name="semester"
            onChange={handleInputChange}
            value={values.semester}
          >
            <option>Primer Semestre</option>
            <option>Segundo Semestre</option>
          </Form.Control>
        </Form.Group>
        <Form.Group onClick={handleSubmit}>
          <Button type="submit">
            {props.currentId === "" ? "Guardar" : "Actualizar"}
          </Button>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default SyllabusForm;
