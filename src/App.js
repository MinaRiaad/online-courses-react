import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/common/navbar";
import ProtectedRoute from "./components/common/protecteRoute";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/common/logout";
import NotFound from "./components/common/notFound";
import Courses from "./components/Courses";
import Users from "./components/Users";
import NewCourse from "./components/CourseForm";
import AdminForm from "./components/AdminForm";
import CategoryForm from "./components/CategoryForm";
import Provider from "./context/userContext";
import Course from './components/Course'
import Categories from "./components/Categories";
import UserCourses from './User/Components/Courses'
import UserProtecteRoute from "./components/common/UserProtectedPath";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {

  

  return (
    <div>
      <React.Fragment>
        <Provider>
          <ToastContainer />
          <Navbar />
          <main className="container">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <UserProtecteRoute path="/coursescollection" render={(props) => <UserCourses />} />
              <UserProtecteRoute path="/course" component={Course} />
              <ProtectedRoute path="/courses" render={(props) => <Courses />} />
              <ProtectedRoute path="/users" render={(props) => <Users />} />
              <ProtectedRoute path="/categories" render={(props) => <Categories />} />
              <ProtectedRoute path="/admin/form/:id" component={AdminForm}/>
              <ProtectedRoute path="/category/form/:id" component={CategoryForm} />
              <ProtectedRoute path="/form/:id" component={NewCourse}/>
              <Redirect from="/" exact to="/coursescollection" />
              <Route path="/notfound" component={NotFound} />
              <Redirect to="/notfound" />
            </Switch>
          </main>
        </Provider>
      </React.Fragment>
    </div>
  );
}

export default App;
