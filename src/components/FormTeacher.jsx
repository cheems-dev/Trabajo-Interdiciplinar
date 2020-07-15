import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";

function FormTeacher() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };

  return (
    <Container className="wrapper">
      <Form.Label className="title">Inicio de Sesión</Form.Label>
      <Form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="input-div">
          <Form.Group className="email">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              className="email"
              type="email"
              name="email"
              placeholder="email@unsa.edu.pe"
              ref={register({
                required: {
                  value: true,
                  pattern: /^[a-z]+@[a-z]+(?:\.[a-z]+)*$/,
                  message: "Ingrese su email Pls",
                },
              })}
            />
            {errors.email?.message}
          </Form.Group>
        </Form.Group>
        <Form.Group className="input-div">
          <Form.Group className="password">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              className="password"
              type="password"
              name="password"
              placeholder="password"
              ref={register({
                required: {
                  value: true,
                  message: "Ingrese su email por favor",
                },
              })}
            />
            {errors.password?.message}
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Button type="submit">Acceder</Button>
        </Form.Group>
        {/* <Form.Group>
          <ButtonGoogle />
        </Form.Group> */}
      </Form>
    </Container>
  );
}
export default FormTeacher;
