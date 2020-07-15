import React, { Component } from "react";
import { app } from "../firebase/index.js";
import "firebase/auth";
import firebase from "firebase";
import FileUpload from "./FileUpload";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// Añadir navegacion
class ButtonGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentWillMount() {
    app.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }
  handleAuth() {
    const { history } = this.props;
    let provider = new firebase.auth.GoogleAuthProvider();

    app
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(`${result.user.email} ha iniciado sesion`);
        history.push("/teacher");
      })
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    const { history } = this.props;
    app
      .auth()
      .signOut()
      .then((result) => {
        console.log(`${result.user.email} ha salido`);
        history.push("/");
      })
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    if (this.state.user) {
      return (
        <div>
          <img
            width="100"
            src={this.state.user.photoURL}
            alt={this.state.user.displayName}
          />
          <p>Hola {this.state.user.displayName}!</p>
          <Button onClick={this.handleLogout} className="App-btn">
            Salir
          </Button>
          <FileUpload />
        </div>
      );
    } else {
      return (
        <Button onClick={this.handleAuth} className="App-btn">
          Iniciar sesion con Google
        </Button>
      );
    }
  }
  render() {
    return (
      <Container className="App">
        <p className="App-Intro">{this.renderLoginButton()}</p>
      </Container>
    );
  }
}

export default ButtonGoogle;
