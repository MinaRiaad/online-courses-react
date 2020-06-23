import http from './httpService'

const apiEndPoint ="/users";

export function register(user){
    return http.post(apiEndPoint,user);
}

export function addNewAdmin(user){
    return http.post(apiEndPoint+"/admin",user);
}

export function getUsers(){
    return http.get(apiEndPoint);
}

export function disableUser(userId){
    return http.put(`${apiEndPoint}/${userId}`);
}

export function addPoints(points){
    return http.post(apiEndPoint+"/points",{points});
}




