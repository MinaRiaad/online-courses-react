import React from "react";
import joi from "joi-browser";
import { register } from "../services/userService";
import auth from '../services/authService'
import Form from "./form";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: joi.string().required().min(8).label("Password"),
    name: joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response=await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location='/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div class="cotainer">
          <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                  <div class="card-header">
                    <h1>Register</h1>
                  </div>
                  <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                      {this.renderInput("email", "Email", "text")}
                      {this.renderInput("name", "Name", "text")}
                      {this.renderInput("password", "Password", "password")}
                      {this.renderButton("Register")}
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
