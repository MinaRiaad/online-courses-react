import React, { Component, useState } from "react";
import auth from '../services/authService'
import Table from "./common/table";
import { Link } from "react-router-dom";
import DisableUser from "./common/DisableUser";

const CoursesTable = (props) => {
  
  const columns = [
    {
      path: "name",
      label: "Name"
    },
    { path: "email", label: "Email" },
    { path: "isAdmin", label: "Role" },
    { path: "disabled", label: "Account Status" },
    {
      path: "disableUser",
      label:"Disable User",
      content: user => (
        <div>
          {!user.disabled && <button
            onClick={() => props.onDisable(user)}
            className="btn btn-danger btn-sm"
          >
            Disable
          </button>}
          {user.disabled && <button
            onClick={() => props.onDisable(user)}
            className="btn btn-primary btn-sm"
          >
            Enable
          </button>}
        </div>
      )
    }
  ];

  const { users, onSort, sortColumn } = props;

  return ( 
    <Table
      columns={columns}
      data={users}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}
 
export default CoursesTable;
