import React, { Component, useState } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

const CoursesTable = (props) => {
  
  const columns = [
    {
      path: "name",
      label: "Name",
      content: course => (
        <Link to={`/form/${course._id}`}>{course.name}</Link>
      )
    },
    { path: "description", label: "Description" },
    {
      path: "categories",
      label: "Categories",
      content: course => {
          return(
            <ul class="list-unstyled mb-0">
              {course.categories.map(category=>
                <h5><span class="badge badge-warning">{category.name}</span></h5>
              )}      
            </ul>
          )
      }  
    },
    { path: "points", label: "Points" },
    {
      path: "delete",
      label:"Delete",
      content: course => (
        <button
          onClick={() => props.onDelete(course)}
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
 
export default CoursesTable;
