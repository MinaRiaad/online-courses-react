import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import {UserContext} from "../../context/userContext"
import _ from 'lodash'

const ProtecteRoute = ({ component: Component, render, ...rest }) => {
  const {currentUser}=useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (! _.get(currentUser,'isAdmin')) return <Redirect to={{
            pathname:'/logout',
            state:{from:props.location}
        }} />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtecteRoute;
