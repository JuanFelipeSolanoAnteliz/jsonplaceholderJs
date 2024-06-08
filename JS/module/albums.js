import { getUser } from "./user.js";

const validateGetAlbum = async ({albumId})=>{
    if(typeof albumId !== "string" || albumId === undefined)return{status: 406, message:`This user dosen't exist in the database`};
};
 
export const getAlbumId = async(arg)=>{
    let val = await validateGetAlbum(arg);
    if(val) return val;
    
    let res = await fetch(`https://53977d67df4867e88ad92ace77f41d81.serveo.net/albums/${arg.albumId}`);
    if(res.status === 404) return {status: 204, message: `Album doesn't exist`};
    
    let data = await res.json();
    return data;
};
// --------------------fin validacion album------------------------



export const getAllbums = async()=>{
    let res = await fetch("https://53977d67df4867e88ad92ace77f41d81.serveo.net/albums");
    let data =await res.json();
    return data;
};

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
    };
    let confirmation = confirm(`Are you sure that you wanna add ${JSON.stringify(arg)}) ?`);
    if(confirmation === true){

        let res = await fetch("https://53977d67df4867e88ad92ace77f41d81.serveo.net/albums",config); 
        let data = await res.json();
        return data;

    };
};
// --------------------fin add album---------------------




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
    };
    
    let confirmation = confirm(`Are you sure that you wanna delete ${JSON.stringify(arg)}?`)
    if(confirmation === true){

        let res = await fetch(`https://53977d67df4867e88ad92ace77f41d81.serveo.net/albums/${arg.id}`,config);
        if(res.status === 404)return `id that was provided isn't registred in the database.` 
        let data = await res.json();
        data.status = 202
        data.message = `The album ${arg.id} was deleted correctly from de database.`
        return alert(JSON.stringify(data));
    }
    else return `Operation cancelled` 
};


// --------------------------------  update albnms ----------------------


const validateUpdate = async({albumId})=>{
    if(typeof albumId !== "string" || albumId === undefined) return {status: 406, message: `The data ${typeof albumId} is not arriving or does not...`}
    let album = await getAlbumId(albumId);
    if(album.status === 204) return `The albmum wasn't found`;
};

export const updateAlbum = async (albumUpdated) =>{
    let val = validateUpdate({albumId})
    if(val)return val;

    let config = {
        method:"PUT",
        headers: {"content-type": "application/json"},
        body:JSON.stringify(albumUpdated)
    };
    let confirm = confirm(`Are you sure that you wanna update ${JSON.stringify(albumUpdated)}?`);
    if(confirm === true ){
        let res = await fetch(`https://53977d67df4867e88ad92ace77f41d81.serveo.net/albums/${{albumId}}`,config)
        let data = res.json();
        return data
    };
};
