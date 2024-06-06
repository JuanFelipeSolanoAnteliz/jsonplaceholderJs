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

const validateDeleteAlbum =({id})=>{
    if(typeof id !== "string" || id === undefined){
        return {status: 406, 
        message: `The id that was provided doesn't meet the correct argument to be found.`};    
    };
}
export const deleteAlbums = async(arg)=>{
    let val = validateDeleteAlbum(arg);
    if(val)return val;
    let config ={
        method:"DELETE",
        headers:{"content-type": "application/json"}
    }

    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.id}`,config);
    if(res.status === 404)return `id that was provided isn't registred in the database.`
    
    let data = await res.json();
    data.status = 202
    data.message = `The album ${arg.id} was deleted correctly from de database.`
    return data;
}

