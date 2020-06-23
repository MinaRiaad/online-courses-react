import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import UsersTable from "./UsersTable";
import { getUsers ,disableUser} from "../services/userService";
import { paginate } from "../utils/paginate";
import {toast} from 'react-toastify';
import SearchBox from "./common/searchBox";
import _ from "lodash";


const Users = () => {
    
    const [users, setUsers] = useState([]);
    const [roles] = useState([{name:"All Users"},{_id:1,name:"Admin",isAdmin:true},{_id:2,name:"Not Admin",isAdmin:false}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
    

    useEffect(() => {
        getData();
    }, []);

    const getData=async ()=>{
        const {data}=await getUsers();
        setUsers(data);
    }

    const handleDisable = async user => {
        const status= user.disabled ? "enabled" : "disabled";
        try{
          await disableUser(user._id);
          const newUsers = users.map(u =>{
            if(u._id === user._id)
              u.disabled=!u.disabled
            return u; 
          } );
          setUsers(newUsers) 
          toast(`this User has been ${status} successfully`);

        }catch(ex){
          if(ex.response&&ex.response.status===404){
            toast.error(`this User has already been ${status}`);
          }
        }
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    
    const handleRoleSelect = role => {
        setSelectedRole(role);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleSearch = query => {
        setSearchQuery(query);
        setSelectedRole(null);
        setCurrentPage(1);
    };

    const handleSort = sortColumn => {
        setSortColumn(sortColumn);
    };

    const getPagedData = () => {
    
        let filtered = users;
        if (searchQuery) {
          filtered=users.filter(u =>
            u.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        } else if (selectedRole && selectedRole._id)
          filtered = users.filter(u => u.isAdmin === selectedRole.isAdmin );
        
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const data = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data };
     };

    const { totalCount, data: filteredUsers } =getPagedData();

    if (totalCount === 0) return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={roles}
            selectedItem={selectedRole}
            onItemSelect={handleRoleSelect}
          />
        </div>
        <div className="col">
        <p>There are no Users in the database.</p>
        <Link
          to="/admin/form/new"
          className="btn btn-success"
          style={{ marginBottom: 20 }}
        >New Admin</Link>
        </div>
      </div>
    );


    return ( 
          <React.Fragment>
          <div className="row">
              <div className="col-3">
                  <ListGroup
                    items={roles}
                    selectedItem={selectedRole}
                    onItemSelect={handleRoleSelect}
                  />
              </div>
              <div className="col">
                  <p>Showing {totalCount} Users in the database.</p>
                  <Link
                  to="/admin/form/new"
                  className="btn btn-success"
                  style={{ marginBottom: 20 }}
                  >
                  New Admin
                  </Link>
                  <SearchBox value={searchQuery} onChange={handleSearch} />  
                  <UsersTable
                      users={filteredUsers}
                      sortColumn={sortColumn}
                      onDisable={handleDisable}
                      onSort={handleSort}
                  />
                  <Pagination
                      itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                  />
              </div>
          </div>
      </React.Fragment>
    );


}
 
export default Users;
