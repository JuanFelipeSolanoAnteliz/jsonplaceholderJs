import { getUser } from "./user.js";



export const getAllbums = async()=>{
    let res = await fetch("https://jsonplaceholder.typicode.com/albums");
    let data =await res.json();
    return data;
}

const validateAddAlbum = async({userId,title})=>{
    if(typeof userId !== "number" ||  userId === undefined)return{status: 406, message: `The data ${typeof userId} is not arriving or does not...`}
    if(typeof title !== "string" || title === undefined)return{status: 406, message: `The data ${typeof userId} is not arriving or does not...`}
    let user = await getUser({userId});
    if(user.status === 204)return {status: 200, message: `the user searched not was found`}
}

export const addAlbum = async(arg)=>{
    let val =await validateAddAlbum(arg);
    if(val) return val;
    let config ={
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    }
    let res = await fetch("https://jsonplaceholder.typicode.com/albums",config); 
    let data = await res.json();
    return data;
};

export const deleteAlbums = async(arg)=>{
    let val = await validateAddAlbum(arg);
    if(val) return val;

    let config = {
        method: "DELETE",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    }
    let res = await fetch("https://jsonplaceholder.typicode.com/albums",config); 
    let data = await res.json();
    return data;
}