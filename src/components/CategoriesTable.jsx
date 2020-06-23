import React, { Component, useState } from "react";
import auth from '../services/authService'
import Table from "./common/table";
import { Link } from "react-router-dom";
import DropdownList from "./common/DropdownList";

const CategoriesTable = (props) => {
  
  const columns = [
    {
      path: "name",
      label: "Name",
      content: course => (
        <Link to={`/category/form/${course._id}`}>{course.name}</Link>
      )
    },
    {
      path: "delete",
      label:"Delete",
      content: movie => (
        <button
          onClick={() => props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      )
    }
  ];

  const { courses, onSort, sortColumn } = props;

  return ( 
    <Table
      columns={columns}
      data={courses}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}
 
export default CategoriesTable;
