import { getUser } from "./user.js";



export const getAllbums = async()=>{
    let res = await fetch("http://172.16.101.146:5802/albums");
    let data =await res.json();
    return data;
}

const validateAddAlbum = async({userId,title})=>{
    if(typeof userId !== "string" ||  userId === undefined)return{status: 406, message: `The data ${typeof userId} is not arriving or does not...`}
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
    let res = await fetch("http://172.16.101.146:5802/albums",config); 
    let data = await res.json();
    return data;
};

