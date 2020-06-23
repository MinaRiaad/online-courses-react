import React from 'react';
import Form from './form';
import joi from "joi-browser";
import auth from '../services/authService'



class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: joi
      .string()
      .email()
      .required()
      .label("Email"),
    password: joi
      .string()
      .min(8)
      .required()
      .label("Password")
  };


  doSubmit=async ()=>{
    try {
      const { data } = this.state;
      await auth.login(data.email,data.password);
      const{state}=this.props.location;
      window.location=state?state.from.pathname:'/';
    } catch (ex) {
      if(ex.response&&ex.response.status===400){
        const errors={...this.state.errors};
        errors.email=ex.response.data;
        this.setState({errors});
      }
    }
  }


  render() { 
    return ( 
      <React.Fragment>
        <div class="cotainer">
          <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                      <h1>Login</h1>
                    </div>
                      <div class="card-body">
                        <form class="login100-form validate-form" onSubmit={this.handleSubmit}>
                          {this.renderInput("email","Email","email")}
                          {this.renderInput("password","Password","password")}
                          {this.renderButton('Login')}
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
 
export default LoginForm ;

