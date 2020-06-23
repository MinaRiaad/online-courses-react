import React, { useState, useEffect } from "react";
import auth from '../services/authService'
import http from "../services/httpService";

export const UserContext = React.createContext(
  {
    currentUser:"",
    setCurrentUser:()=>{}
  });

const Provider = (props) => {
  const user=auth.getCurrentUser();
  let totalpoints=parseInt(localStorage.getItem('points'));
  if(user) 
    user.points=totalpoints;
  const [currentUser, setCurrentUser] = useState(user);
  return (
    <UserContext.Provider value={{currentUser,setCurrentUser}}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
