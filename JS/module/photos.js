import { getAlbumId, getAllbums, } from "./albums.js";

export const getPhotos =async()=>{
    
    let res = await fetch("https://4d012986b9e776981f20439de390dddd.serveo.net/photos");
    let  data = res.json();
    return data;

};

const validateAddPhotos= async({idAlbum,title,url,thumbnailUrl})=>{

    if(typeof idAlbum !== "string" || idAlbum === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof title !== "string" || title === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof url !== "string" || url === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof thumbnailUrl !== "string" || thumbnailUrl === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    
    let album = await getAlbumId({idAlbum});
    if(album.status === 204)return {status: 200, message: `the user searched not was found`}
};

export const addPhotos = async(newPhoto)=>{
    let val = await validateAddPhotos(newPhoto);
    if(val) return val;
    let config ={
        method:"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(newPhoto)
    };
    let res = await fetch("https://4d012986b9e776981f20439de390dddd.serveo.net/photos",config);
    let data = res.json();
    return data;
};
//-----------------------fin add Photos------------

const validateDeletePhotos = async(idPhoto)=>{
    if(typeof idPhoto !== "string" || idPhoto === undefined)
        return {
        status: 406, 
        message: `The id that was provided doesn't meet the correct argument to be found.`
        };
};

export const deletePhotos = async (firePhoto)=>{

    let val =  validateDeletePhotos(firePhoto);
    if(val)return val;
    
    let config ={
        method: "DELETE",
        headers: {"content-type": "application/json"}
    };

    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/photos/${firePhoto.idPhoto}`,config);
    if(res.status === 404)return `id that was provided isn't registred in the database.`

    let data = await res.json();
    data.status = 202
    data.message = `The album ${firePhoto.idPhoto} was deleted correctly from de database.`
    return data;
};
