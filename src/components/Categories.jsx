import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import CategoriesTable from "./CategoriesTable";
import { getCategories ,deleteCategory} from "../services/categoryService";
import { paginate } from "../utils/paginate";
import {toast} from 'react-toastify';
import SearchBox from "./common/searchBox";
import _ from "lodash";


const Courses = () => {
    
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
   

    useEffect(() => {
        getData();
    }, []);

    const getData=async ()=>{
        const {data}=await getCategories();
        setCategories(data);        
    }

    const handleDelete = async category => {
        const originalCategories=categories;
        const newCategories = categories.filter(c => c._id !== category._id);
        setCategories(newCategories)
        try{
          await deleteCategory(category._id);
        }catch(ex){
          if(ex.response&&ex.response.status===404){
            toast.error("this category has already been deleted");
          }
          setCategories(originalCategories)
        }
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    

    const handleSearch = query => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleSort = sortColumn => {
        setSortColumn(sortColumn);
    };

    const getPagedData = () => {
        let filtered = categories;
        if (searchQuery) {
          filtered=categories.filter(c =>
            c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const data = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data };
    };

    const { totalCount, data: filteredCourses } =getPagedData();
     

    if (totalCount === 0) return (
      <div className="row">
        <div className="col">
        <p>There are no courses in the database.</p>
        <Link
          to="/category/form/new"
          className="btn btn-success"
          style={{ marginBottom: 20 }}
        >New Category</Link>
        </div>
      </div>
    );


    return ( 
          <React.Fragment>
          <div className="row">
              <div className="col">
                  <p>Showing {totalCount} courses in the database.</p>
                  <Link
                  to="/category/form/new"
                  className="btn btn-success"
                  style={{ marginBottom: 20 }}
                  >
                  New Category
                  </Link>
                  <SearchBox value={searchQuery} onChange={handleSearch} />  
                  <CategoriesTable
                      courses={filteredCourses}
                      sortColumn={sortColumn}
                      onDelete={handleDelete}
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
 
export default Courses;
