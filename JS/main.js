import { getAllbums, addAlbum } from "./module/albums.js";
import { getUser } from "./module/user.js";
import { addPost } from "./module/post.js";


console.table( await addPost({userId:1, title:"asjdfhkjsa", body:"holaasd"}));

// console.table(await getUser({userId:10}));