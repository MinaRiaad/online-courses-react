import React, { useState, useEffect, useContext } from 'react';
import Card from '../../components/common/Card'
import SearchBox from '../../components/common/searchBox';
import ListGroup from '../../components/common/listGroup';
import Pagination from "../../components/common/pagination";
import { getCourses,registerUser, cancelRegister,finishCourse } from "../../services/courseService";
import {addPoints } from "../../services/userService";
import { getCategories } from "../../services/categoryService";
import { paginate } from "../../utils/paginate";
import _ from 'lodash'
import { UserContext } from '../../context/userContext';
import { toast } from 'react-toastify';

const UserCourses = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortColumn] = useState({ path: "name", order: "asc" });
    const {currentUser,setCurrentUser} = useContext(UserContext);

    useEffect(() => {
        getData();
    }, []);

    const getData=async ()=>{
        const {data}=await getCategories();
        setCategories([{ _id: "", name: "All categories" }, ...data]);        
        const {data:courses}=await getCourses();
        setCourses(courses);
    }

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

    const handleRegister =async courseId =>{
        await registerUser(courseId); 
        const data = courses.map(c =>{
            if(c._id === courseId)
                c.registeredUsers.push(currentUser._id)
            return c; 
        });
        setCourses(data);
        toast(`You have been registered successfully`);
    }

    const handleFinish =async course =>{
        await finishCourse(course._id);
        await addPoints(course.points);
        let totalpoints=parseInt(localStorage.getItem('points'));
        totalpoints+=course.points;
        localStorage.setItem('points',totalpoints);
        currentUser.points+=course.points;
        setCurrentUser({...currentUser});
        const data = courses.map(c =>{
            if(c._id === course._id)
                c.finishers.push(currentUser._id)
            return c; 
        });
        setCourses(data);
        toast(`You have finish course successfully`);
    }

    const handleCancelRegister =async courseId =>{
        await cancelRegister(courseId); 
        const data = courses.map(c =>{
            if(c._id === courseId){
                const newUsers=c.registeredUsers.filter(user=>user !== currentUser._id);
                c.registeredUsers=newUsers;
            }
            return c; 
        });
        setCourses(data);
        toast(`You have cancelled registeration successfully`);
    }

    const getPagedData = () => {
    
        let filtered = courses;
        if (searchQuery) {
          filtered=courses.filter(c =>
            c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        } else if (selectedCategory && selectedCategory._id){
            filtered = filtered.filter(c => _.some(c.categories,selectedCategory));
        }
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const data = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data };
     };

    const { totalCount, data: filteredCourses } =getPagedData();
    return ( 
        <React.Fragment>
            <div class="container">
                <div class="row">
                    <div className="col-lg-3 col-md-3 mb-1">
                        <ListGroup
                            items={categories}
                            selectedItem={selectedCategory}
                            onItemSelect={handleCategorySelect}
                        />
                    </div>
                    <div class="col-lg-9">
                        <SearchBox value={searchQuery} onChange={handleSearch} />  
                        <div class="row">
                            {filteredCourses.map((course)=>
                                <div class="col-lg-4 col-md-6 mb-4">
                                    <Card 
                                    course={course}
                                    onRegister={handleRegister} 
                                    onCancelRegisteration={handleCancelRegister}
                                    onFinish={handleFinish}
                                    />
                                </div>
                            )}
                        </div>
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>    
        </React.Fragment>
                
     );
}
 
export default UserCourses;