import { getAllbums, addAlbum, deleteAlbums } from "./module/albums.js";
import { getUser } from "./module/user.js";
import { addPost } from "./module/post.js";

// console.table( await addPost({userId:"1", title:"MAÑANA NO HAY CLASE", body:"LO DIJO MIGUEL FR"}));
// console.table(await getUser({userId:10}));
// console.log( await deleteAlbums({id:"9f78"}))
let menuAlbums =async()=>{
    
    let menu = prompt(`
    Album menu 
    
    1. Search.
    2. Add.
    3. Delete.
    `)
        if(menu == 1){
            return await getAllbums();
        }
        else if( menu == 2){
            let userId = prompt(`Enter the id user: `)
            let title = prompt(`Enter a title to the album: `)
            return await addAlbum({userId:userId, title: title });
        }
        else if( menu == 3 ){ 
        let idAlbum = prompt(`Enter de album id that will be delete.`)
        return await deleteAlbums({id:idAlbum})
    }
    
    else{
        return console.log(`the opcion selected isn't a valid option.`)
    }
}

console.log( await menuAlbums());
