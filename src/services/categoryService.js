import http from './httpService';

const apiEndPoint = "/categories";

function categoryUrl(id){
   return `${apiEndPoint}/${id}`;
 }

export function getCategories() {
   return http.get(apiEndPoint);
}

export function deleteCategory(categoryId) {
   return http.delete(categoryUrl(categoryId));
}

export function getCategory(categoryId){
   return http.get(categoryUrl(categoryId));
 }

export function saveCategory(category) {
   if(category._id){
      const body={...category};
      delete body._id;
      return http.put(categoryUrl(category._id),body);
    }
   return http.post(apiEndPoint,category);
}
