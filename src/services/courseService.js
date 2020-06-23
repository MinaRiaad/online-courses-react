import http from './httpService';


const apiEndPoint = "/courses";

function courseUrl(id){
  return `${apiEndPoint}/${id}`;
}

export function getCourses() {
  return http.get(apiEndPoint);
}

export function getCourse(courseId){
  return http.get(courseUrl(courseId));
}

export function deleteCourse(courseId){
  return http.delete(courseUrl(courseId));
}

export function registerUser(courseId){
  return http.post(courseUrl(courseId)+'/register');
}

export function cancelRegister(courseId){
  return http.post(courseUrl(courseId)+'/cancel');
}

export function finishCourse(courseId){
  return http.post(courseUrl(courseId)+'/finish');
}

export function saveCourse(course,id){
  if(id){
    return http.put(courseUrl(id),course);
  }
  return http.post(apiEndPoint,course);
}






