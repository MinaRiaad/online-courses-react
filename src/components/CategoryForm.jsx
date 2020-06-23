import React from "react";
import joi from "joi-browser";
import Form from "./form";
import {saveCategory,getCategory } from "../services/categoryService";

class CategoryForm extends Form {
  state = {
    data: { name: "" },
    errors: {},
  };

  schema = {
    _id: joi.string(),
    name: joi.string().min(2).required().label("Name")
  };


  async populateCategories() {
    try {
      const categoryId = this.props.match.params.id;
      if (categoryId === "new") return;
      const { data: category } = await getCategory(categoryId);
      this.setState({ data: this.mapToViewModel(category) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/notfound");
    }
  }

  async componentDidMount() {
    await this.populateCategories();
  }

  mapToViewModel = (category) => {
    return {
      _id: category._id,
      name: category.name,
    };
  };

  doSubmit = async () => {
    await saveCategory(this.state.data);
    this.props.history.push("/categories");
  };

  render() {
    return (
          <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                  <div class="card-header">
                    <h1>Category Form</h1>
                  </div>
                  <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                      {this.renderInput("name","Name", "text")}
                      {this.renderButton("Save")}
                    </form>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default CategoryForm;
