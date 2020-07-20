import React,{useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import 'firebase/auth';
import {useFirebaseApp,useUser} from "reactfire";
import { useForm } from "react-hook-form";

const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const firebase = useFirebaseApp();
  const usuario = useUser();

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    console.log(data);
    await setEmail(data.email);
    await setPassword(data.password);
    await firebase.auth().signInWithEmailAndPassword(data.email,data.password);
    e.target.reset();
  };

  const logout = async() => {
    await firebase.auth().signOut();
  };

  return(
    <Container className="wrapper">
    <div className="logout">
        {usuario && 
        <div className="sesion">
          <p> Bienvenido  Usuario: {usuario.email}</p>
          <div>
            <Link to="/HomeTeacher">
                  <Button variant="outline-success">Area de Docentes</Button>
            </Link>
          </div>
          <p></p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
        }
    </div>    

        {!usuario && 
          <Col>
            <Form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
              <Form.Label className="title">Inicie Sesión</Form.Label>
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
                        message: "Ingrese su email por favor",
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
                        message: "Ingrese su contraseña por favor",
                      },
                    })}

                  />
                  {errors.password?.message}
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Button type="submit">Ingresar</Button>
              </Form.Group>
            </Form>
              <Link to="/register">
                <Button variant="outline-success">Registrarse</Button>
              </Link>
          </Col>
        }  
    </Container> 
  );
};

export default Login;
