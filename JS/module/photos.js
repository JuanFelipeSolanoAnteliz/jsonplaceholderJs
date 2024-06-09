import { getAlbumId, getAllbums, } from "./albums.js";

export const getPhotos =async()=>{
    
    let res = await fetch("https://4d012986b9e776981f20439de390dddd.serveo.net/photos");
    let  data = await res.json();
    return data;

};

export const getPhotosId = async(idPhoto)=>{
    let res= await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/photos/${idPhoto}`);
    if(!res.ok) return{
        status:204,
        message:`The id wasn't found`
    }
    else{
        let data = await res.json();
        return alert(JSON.stringify(data));
    };
};



const validateAddPhotos= async({idAlbum,title,url,thumbnailUrl})=>{

    if(typeof idAlbum !== "string" || idAlbum === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving.`};
    if(typeof title !== "string" || title === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving.`};
    if(typeof url !== "string" || url === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving.`};
    if(typeof thumbnailUrl !== "string" || thumbnailUrl === undefined)
        return {status: 406, message: `The data ${typeof userId} is not arriving.`};
    
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
    let confirmation = confirm(`Are you sure that you want to add this photo?`)
    if(confirmation===true){

        let res = await fetch("https://4d012986b9e776981f20439de390dddd.serveo.net/photos",config);
        let data = res.json();
        return alert(JSON.stringify(newPhoto)+` was added successfuly!`);
    }else return `operation cacelled :[`
};
//-----------------------fin add Photos------------

const validateDeletePhotos = async(idPhoto)=>{
    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/photos/${idPhoto}`)
    if(!res.ok)return{status: 204, message: `Id wasn't found in the database`}
};

export const deletePhotos = async (firePhoto)=>{

    let val =  await validateDeletePhotos(firePhoto);
    if(val)return alert(JSON.stringify(val));
    let config ={
        method: "DELETE",
        headers: {"content-type": "application/json"}
    };

    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/photos/${firePhoto}`,config);
    if(res.status === 404)return `id that was provided isn't registred in the database.`

    let data = await res.json();
    data.status = 202
    data.message = `The album ${firePhoto} was deleted correctly from de database.`
    return alert(JSON.stringify(data)+` Was deleted successfuly!`);
};
