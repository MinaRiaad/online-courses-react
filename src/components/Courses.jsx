import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import CoursesTable from "./CoursesTable";
import { getCourses ,deleteCourse} from "../services/courseService";
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import {toast} from 'react-toastify';
import SearchBox from "./common/searchBox";
import _ from "lodash";


const Courses = () => {
    
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

    useEffect(() => {
        getData();
    }, []);

    const getData=async ()=>{
        const {data}=await getCategories();
        setCategories([{ _id: "", name: "All categories" }, ...data]);        
        const {data:courses}=await getCourses();
        setCourses(courses);
    }

    const handleDelete = async course => {
        const originalCourses=courses;
        const newCourses = courses.filter(c => c._id !== course._id);
        setCourses(newCourses)
        try{
          await deleteCourse(course._id);
        }catch(ex){
          if(ex.response&&ex.response.status===404){
            toast.error("this movie has already been deleted");
          }
          setCourses(originalCourses)
        }
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    
    const handleCategorySelect = category => {
        setSelectedCategory(category);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleSearch = query => {
        setSearchQuery(query);
        setSelectedCategory(null);
        setCurrentPage(1);
    };

    const handleSort = sortColumn => {
        setSortColumn(sortColumn);
    };

    const getPagedData = () => {
    
        let filtered = courses;
        if (searchQuery) {
          filtered=courses.filter(c =>
            c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        } else if (selectedCategory && selectedCategory._id)
          filtered = courses.filter(c => _.some(c.categories,selectedCategory));
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const data = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data };
     };

    const { totalCount, data: filteredCourses } =getPagedData();
     

    if (totalCount === 0) return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={categories}
            selectedItem={selectedCategory}
            onItemSelect={handleCategorySelect}
          />
        </div>
        <div className="col">
        <p>There are no courses in the database.</p>
        <Link
          to="/form/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >New Course</Link>
        <SearchBox value={searchQuery} onChange={handleSearch} />  
        </div>
      </div>
    );


    return ( 
          <React.Fragment>
          <div className="row">
              <div className="col-3">
                  <ListGroup
                  items={categories}
                  selectedItem={selectedCategory}
                  onItemSelect={handleCategorySelect}
                  />
              </div>
              <div className="col">
                  <p>Showing {totalCount} courses in the database.</p>
                  <Link
                  to="/form/new"
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                  >
                  New Course
                  </Link>
                  <SearchBox value={searchQuery} onChange={handleSearch} />  
                  <CoursesTable
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
