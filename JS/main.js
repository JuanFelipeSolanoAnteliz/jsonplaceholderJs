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


// ----------------------------------------menu comments----------------------------------
let menuComments= async()=>{
    menu = prompt(`
        menu Comments
    1. Get 
    2. Add
    3. Delete
    `);
    if(menu == 1){
        return await getComment();
    }
    else if( menu == 2){
        let postId = prompt(`Enter the post id: `);
        let name = prompt(`Enter a name: `);
        let email = prompt(`Enter an email: `);
        let body = prompt(`Enter a body to the comment: `);
        
        return await addComment({postId:postId, name:name, email:email, body:body});
    }
    else if( menu == 3 ){ 
    let idComment = prompt(`Enter the comment id that you wanna delete.`)
    return await deleteComments({fireId:idComment})
    }

    else{
        return console.log(`the opcion selected isn't a valid option.`)
    }
};
// ------------------------------------- menuPhotos--------------------------------------
let menuPhotos = async()=>{
    menu = prompt(`
    menu Photos
1. Get 
2. Add
3. Delete
`);
if(menu == 1){
    return await getPhotos();
}
else if( menu == 2){
    let idAlbum = prompt(`Enter the album id: `);
    let title = prompt(`Enter a title to the photo: `);
    let url = prompt(`Enter an url: `);
    let thumbnailUrl = prompt(`Enter a thumbnailUrl to the photo: `);
    
    return await addPhotos({idAlbum:idAlbum, title:title, url:url, thumbnailUrl:thumbnailUrl});
}
else if( menu == 3 ){ 
let firePhoto = prompt(`Enter the comment id that you wanna delete.`);
return await deletePhotos({firePhoto:firePhoto});
}

else{
    return console.log(`the opcion selected isn't a valid option.`);
}
};

let menuPosts = async()=>{

    menu = prompt(`
    menu Prost
1. Get 
2. Add
3. Delete
`);
if(menu == 1){
    return await getPost();
}
else if( menu == 2){
    let userId = prompt(`Enter the user id: `);
    let title = prompt(`Enter a title to the post: `);
    let body = prompt(`Enter an url: `);
    
    return await addPost({userId:userId, title:title, body:body});
}
else if( menu == 3 ){ 
let idpost = prompt(`Enter the comment id that you wanna delete.`);
return await deletePost({id:idpost});
}

else{
    return console.log(`the opcion selected isn't a valid option.`);
}
};
   
let User = async()=>{
    let menu = prompt(`
    user menu
    1. Get
    `)
    if(prompt == 1 )return getUser();
}

//------------------------------------------- main menu----------------------------------------
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
await menu();