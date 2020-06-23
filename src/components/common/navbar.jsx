import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {

const {currentUser:user} = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
          Online Courses
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
        {user && user.isAdmin && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/courses">
                Courses
            </NavLink>
            <NavLink className="nav-item nav-link" to="/users">
                Users
            </NavLink>
            <NavLink className="nav-item nav-link" to="/categories">
                Categories
            </NavLink>
          </React.Fragment>  
        )}
        
          <React.Fragment>
              <NavLink className="nav-item nav-link" to="/coursescollection">
                  Courses
              </NavLink>
          </React.Fragment>
        
        </ul>
        <ul className="navbar-nav mr-auto">
            
        </ul>
        {!user && (
          <React.Fragment>
            <span className="navbar-text">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
            </span>
            <span className="navbar-text">
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </span>
          </React.Fragment>
        )}
        {user && !user.isAdmin && <span className="navbar-text">
          <h6>Total Points <span class="badge badge-light badge-pill">{user.points}</span></h6>
        </span>}
        {user && (
          <React.Fragment>
            
            <span className="navbar-text">
              <NavLink className="nav-item nav-link" to="/">
                {user.name}
              </NavLink>
            </span>
            <span className="navbar-text">
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </span>
          </React.Fragment>
        )}
        </div>
        
        </nav>
    </div> 
  );
};

export default Navbar;
