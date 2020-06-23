import React from "react";
import {Dropdown} from 'react-bootstrap'
import { Link } from "react-router-dom";

const DropdownList = ({
  items
}) => {
  return (
    <Dropdown>
        <Dropdown.Toggle variant="none" id="dropdown-basic">
            Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {items.map(item=>
                <Dropdown.Item>
                    <Link to={`/course/form/${item._id}`}>{item.name}</Link>
                </Dropdown.Item>
            )}
        </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownList;
