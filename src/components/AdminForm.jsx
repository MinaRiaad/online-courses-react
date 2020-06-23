import React from "react";
import joi from "joi-browser";
import { addNewAdmin } from "../services/userService";
import Form from "./form";
import { toast } from "react-toastify";

class AdminForm extends Form {
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
      await addNewAdmin(this.state.data);
      toast("an admin added successfully :)");
      window.location='/users'
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
                    <h1>Add Admin</h1>
                  </div>
                  <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                      {this.renderInput("name", "Name", "text")}
                      {this.renderInput("email", "Email", "text")}
                      {this.renderInput("password", "Password", "password")}
                      {this.renderButton("Add")}
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

export default AdminForm;
