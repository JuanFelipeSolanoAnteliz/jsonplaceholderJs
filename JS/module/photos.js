import { getAllbums } from "./albums";

export const getPhotos =async()=>{
    
    let res = await fetch("https://eeb0d5d633a3ac44a1c6ad64f07d43a4.serveo.net/photos");
    let  data = res.json();
    
    return data;

};