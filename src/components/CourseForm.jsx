import React from "react";
import joi from "joi-browser";
import Form from "./form";
import {  saveCourse, getCourse} from "../services/courseService";
import { getCategories } from "../services/categoryService";
import { toast } from "react-toastify";

class NewCourse extends Form {
  state = {
    data: { name: "", description: "", points: "",media:null,categories:[]},
    categories: [],
    errors: {},
    _id:null
  };
  

  schema = {
    _id: joi.string(),
    name: joi.string().required().label("Name"),
    categories: joi.label("Category"),
    description: joi.string().required().label("Description"),
    points: joi
      .number()
      .min(1)
      .required()
      .label("Points"),
    media:joi.label('media')
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async populateCourses() {
    try {
      const cousreId = this.props.match.params.id;
      if (cousreId === "new") return;
      this.setState({_id:cousreId});
      const { data: course } = await getCourse(cousreId);
      this.setState({ data: this.mapToViewModel(course) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/notfound");
    }
  }

  async componentDidMount() {
    await this.populateCategories();
    await this.populateCourses();
  }

  mapToViewModel = (course) => {
    return {
      _id: course._id,
      name: course.name,
      points: course.points,
      categories: course.categories,
      description: course.description,
      media: course.media,
    };
  };

  doSubmit = async (event) => {
    const data = new FormData();
    if(this.state.data.media){
      for(var x = 0; x<this.state.data.media.length; x++) {
        data.append('media', this.state.data.media[x])
      } 
    }
    if(this.state.data.categories.length){
      for(var x = 0; x<this.state.data.categories.length; x++) {
        data.append('categories',this.state.data.categories[x]);
      } 
    }
    data.set('name',this.state.data.name);
    data.set('description',this.state.data.description);
    data.set('points',this.state.data.points);
    try {
      await saveCourse(data,this.state._id);
      this.props.history.push("/courses");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        toast.error(ex.response.data);
        this.setState({ errors });
      }
    }
  };

  render() {
    const { categories } = this.state;
    return (
          <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                  <div class="card-header">
                    <h1>CourseForm</h1>
                  </div>
                  <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                      {this.renderInput("name","Name", "text")}
                      {this.renderTextArea("description", "Description", "text")}
                      {this.renderInput("points", "Points", "Number")}
                      {this.renderSelectMenu("categories", "Categories", "text",categories)}
                      <div className="form-group row">
                        <div className="col-md-6 files"> 
                            <input 
                                type="file" 
                                id="media"
                                name="media"
                                onChange={this.handleFileUpload}
                                className="form-control" 
                                multiple
                                accept="image/png,image/jpeg ,image/jpg,video/mp4"
                                
                            />
                        </div>
                      </div>
                      {this.renderButton("Save")}
                    </form>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default NewCourse;
