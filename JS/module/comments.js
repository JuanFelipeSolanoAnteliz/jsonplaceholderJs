import { getPost } from "./post.js"

export const getComment = async()=>{
    let res = await fetch("http://172.16.101.146:5801/comments");
    let data = await res.json();
    return data;
};


export const  validateComment = async ({postId,name,email,body}) =>{
    if(typeof postId !== "string" || postId === undefined) return{status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof name !== "string" || name ===undefined) return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof email !== "string" || email ===undefined) return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof body !== "string" || body ===undefined) return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};

    let post = await getComment({postId});
    if(post.status === 204)return {status: 200, message: `the user searched not was found`}
};

export const addComment = async (arg) =>{

    let val = await validateComment(arg);
    if(val) return val;
    let config ={
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    };

    let res = await fetch(`http://172.16.101.146:5801/comments`,config);
    let data = res.json();
    return data;
};


