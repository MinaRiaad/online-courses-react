import React, { Component } from "react";
import Input from "./common/Input";
import joi from "joi-browser";
import MultibleChoice from './common/MultibleChoice'
import TextArea from "./common/TextArea";

class Form extends Component {
    validate = () => {
      const { data } = this.state;
      const options = { abortEarly: false };
      const { error } = joi.validate(data, this.schema, options);
      if (!error) return null;
      const errors = {};
      error.details.map(item => {
        errors[item.path[0]] = item.message;
      }); 
      return errors;
    };
  
    validateProperty = ({ name, value }) => {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    };
  
    handleSubmit = event => {
      event.preventDefault();
      console.log(event.target.children);
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      this.doSubmit();
    };

  
    handleChange = ({ currentTarget: input }) => {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];
      const data = { ...this.state.data };
      data[input.name] = input.value;
      this.setState({ data, errors });
    };

    handleSelect = (categories) => {
      const data = { ...this.state.data };
      data.categories=categories;
      this.setState({ data });
    };

    handleClick = event=>{
      event.target.setAttribute("disabled", "disabled"); 
    }


    handleFileUpload=(event)=>{
      const data = { ...this.state };
      data.data.media = event.target.files;
      this.setState(data);
    }
  
    renderInput = (name, label, type) => {
      const { data, errors } = this.state;
      return (
        <Input
          type={type}
          value={data[name]}
          onChange={this.handleChange}
          id={name}
          name={name}
          autoComplete={name}
          label={label}
          error={errors[name]}
        />
      );
    };

    renderTextArea = (name, label, type) => {
      const { data, errors } = this.state;
      return (
        <TextArea
          type={type}
          value={data[name]}
          onChange={this.handleChange}
          id={name}
          name={name}
          autoComplete={name}
          label={label}
          error={errors[name]}
        />
      );
    };

    
    renderSelectMenu = (name, label, type,options) => {
      return (
        <MultibleChoice
          id={name}
          name={name}
          label={label}
          options={options}
          type={type}
          onChange={this.handleSelect}
        />
      )
    };

    renderMultibleChoice = (name, label,type,options) => {
      const { data, errors } = this.state;
      return (
        <MultibleChoice
          id={name}
          name={name}
          label={label}
          categories={options}
          type={type}
          value={data[name]}
          onItemSelect={this.handleSelect}
          error={errors[name]}
        />
      )
    };
  
    renderButton = label => {
      return (
        <button
          disabled={this.validate()}
          type="submit"
          className="btn btn-primary"
        >
          {label}
        </button>
      )
    };
  }
  
  export default Form;