import { getAllbums, addAlbum, deleteAlbums } from "./module/albums.js";
import { getUser } from "./module/user.js";
import { addPost, deletePost } from "./module/post.js";
import { getComment, addComment, deleteComments } from "./module/comments.js";
import { getPhotos,addPhotos, deletePhotos } from "./module/photos.js";

// console.table(await getUser({userId:10}));

// console.table( await addPost({userId:"1", title:"MAÑANA NO HAY CLASE", body:"LO DIJO MIGUEL FR"}));
// console.log(await deletePost({id:"2b92"}))

// console.log( await deleteAlbums({id:"9f78"}))

// console.table( await getComment())
//  console.table( await addComment({postId: "1",name:"endpoints",email:"hola",body:"profe porfa ponga los endpoints asd"}))


// console.table( await getPhotos());
// console.log(await addPhotos({idAlbum:"1",title:"esta monda no sirve",url:"www.asd",thumbnailUrl:"www.mamañemas"}))
// console.log(await deletePhotos({idPhoto:"d485"}))



// ----------------------------main menu------------------------

let menu = async()=>{
    let menu = prompt(`
                menu principal
    1. Albums
    2. Comment
    3. Photos
    4. Posts
    5. User
    `)

    if(menu == 1)return await menuAlbums();
    else if(menu == 2) return await menuComments();
    else if(menu == 3)return await menuPhotos();
    else if(menu == 4)return await menuPosts();
    else if(menu == 5)return await menuUser();
};

// -------------------------menu album------------------------------------------
let menuAlbums =async()=>{
    
    let menu = prompt(`
    Album menu 
    
    1. get.
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

