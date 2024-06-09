import { getUser } from "./user.js";

const validateGetPostid = async ({postId})=>{
    if(typeof userId !== "string" ||postId === undefined)return{status: 406, message:`This user dosen't exist in the database`};
};
 
export const getPostId = async(arg)=>{
    let val = await validateGetPostid(arg);
    if(val) return val;
    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/comments/${arg.postId}`);
    if(res.status === 404) return {status: 204, message: `post id doesn't exist`};
    let data = await res.json();
    return data;
};


export const getPost = async()=>{
    let res = await fetch("https://4d012986b9e776981f20439de390dddd.serveo.net/posts");
    let data =await res.json();
    return data;
}

const validatePost = async({userId,title,body})=>{
    if(typeof userId !== "string" || userId === undefined) return {status:406, message: "The user id provided wasn't found or not have the correct requeriments." }
    if(typeof title !== "string" || title === undefined) return {status:406, message: "The title provided wasn't found or not have the correct requeriments." }
    if(typeof body !== "string" || body === undefined) return {status:406, message: "The body provided wasn't found or not have the correct requeriments." }

    let user = await getUser({userId});
    if(user.status === 204)return {status: 200, message: `the user searched not was found`}
}

export const addPost = async(arg)=>{
    let val = await validatePost(arg);
    if(val) return val;
    let config = {
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify(arg)

    }
    let res = await fetch("https://4d012986b9e776981f20439de390dddd.serveo.net/posts",config);
    let data = await res.json();
    return data;
};

const validatedelete =({id})=>{
    if(typeof id !== "string" || id === undefined)
    return {
    status: 406, 
    message: `The id that was provided doesn't meet the correct argument to be found.`
    };   

return null;
}
export const deletePost = async(arg)=>{
    let val = validatedelete(arg);
    if(val)return val;

    let config ={
        method: "DELETE",
        headers:{"content-type": "application/json"}
    }

    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/posts/${arg.id}`, config);
    if(res.status === 404)return `The id provide isn't registred in the database, try with another id`

    if(res.status !== 200 ) return{
        status: res.status,
        message: `Failed to delete post with id ${arg.id}`
    };

    let data = await res.json();
    data.status = 202;
    data.message = `The post ${arg.id} was deleted from the database`;
    return data;
}





    

