import { menu } from "../main.js";
import { getUser } from "./user.js";

const validateGetAlbum = async ({albumId})=>{
    if(typeof albumId !== "string" || albumId === undefined)return{status: 406, message:`This user dosen't exist in the database`};
};
 
export const getAlbumId = async(arg)=>{
    let val = await validateGetAlbum(arg);
    if(val) return val;
    
    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.albumId}`);
    if(res.status === 404) return {status: 204, message: `Album doesn't exist`};
    
    let data = await res.json();
    return data;
};
// --------------------fin validacion album------------------------



export const getAllbums = async()=>{
    let res = await fetch("http://172.16.101.146:5802/albums");
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
    let confirmation = confirm(`Are you sure that you wanna add ${JSON.stringify(arg)}?`);
    if(confirmation === true){

        let res = await fetch("http://172.16.101.146:5802/albums",config); 
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

        let res = await fetch(`http://172.16.101.146:5802/albums/${arg.id}`,config);
        if(res.status === 404)return `id that was provided isn't registred in the database.` 
        let data = await res.json();
        data.status = 202
        data.message = `The album ${arg.id} was deleted correctly from de database.`
        return alert(JSON.stringify(data));
    }
    else return `Operation cancelled` 
};


// --------------------------------  update albnms ----------------------

const getToUpdate =async(idAlbum)=>{
    let res = await fetch(`http://172.16.101.146:5802/albums/${idAlbum}`);
    let data = await res.json();
    return data;

};

export const albumupdate = async (idAlbum) =>{
    let data = await getToUpdate(idAlbum);
    if(data.ok){
        return alert(data)
    }
    else{
        let albumkeys = [];
        let indexAlbum = [];
        let index = 1;

        for(let keys in data){
            albumkeys.push(keys);
            indexAlbum.push(`${index++}. ${keys}`);
        }let  option = Number(prompt(`select one option:\n${indexAlbum.join(`\n`)}`));
        if(option == 2){
            alert(`sorry, this data is immutable :[`);
        }else if(typeof option !== "number" || option===undefined || option > albumkeys.length){
            alert(`the data provided is not avalible, try again.`);
        }else{
            let newValue = prompt(`enter the new value to ${[albumkeys[option-1]]}`)
            data[albumkeys[option-1]]=newValue;

            let config ={
                method:"PUT",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(data)
            };
            let confirmation = confirm(`Are you sure that you want to update \n ${JSON.stringify(data,null,2)}`);
            if(confirmation===true){
                let res = await fetch(`http://172.16.101.146:5802/albums/${idAlbum}`,config);
                alert(`the data was updated successfully!`)
                menu();
            }else{
                alert(`operation cancelled :[`)
                menu();
            };
        };
    };
};