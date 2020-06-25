import React, { Component } from "react";
import "../container/Login.css";
import cs from "../../assets/img/cs.png";

const emailRegex = RegExp(/^[a-z]+@[a-z]+(?:\.[a-z]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
         --SUBMITTING--
         Email: ${this.state.email}
         Password: ${this.state.password}
        `);
    } else {
      console.log("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    e.target.reset();
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="img">
          <img src={Unsa} alt="" />
        </div>
        <div className="form-wrapper">
          <img className="avatar" src={cs} alt="" />
          <form className="login-container" onSubmit={this.handleSubmit}>
            <h1 className="title">LOGIN</h1>
            <div className="input-div">
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
            </div>
            <div className="input-div">
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
            </div>
            <div className="createAccount">
              <input className="button" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
