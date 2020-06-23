import React, { useContext } from "react";
import _ from "lodash";
import {UserContext} from '../../context/userContext';

const TableBody = (props) => {

  const currentUser = useContext(UserContext);
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.path==="isAdmin") return _.get(item, column.path)?"Admin":"Not Admin"
    if (column.path==="disabled") return _.get(item, column.path)?"Disabled":"Enabled"
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  

  const { data, columns } = props;

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={createKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

}
 
export default TableBody ;
