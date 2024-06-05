import { getUser } from "./user";

const validatePost = async({userId,title,body})=>{
    if(typeof userId !== "number" || userId === undefined) return {status:406, message: "The user id provided wasn't found or not have the correct requeriments." }
    if(typeof title !== "string" || title === undefined) return {status:406, message: "The title provided wasn't found or not have the correct requeriments." }
    if(typeof body !== "string" || body === undefined) return {status:406, message: "The body provided wasn't found or not have the correct requeriments." }

    let user = await (getUser({userId}));
    if(user.status === 204)return {status: 200, message: `the user searched not was found`}
};

export const addPost = async(arg)=>{

    const config = {
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify(arg)

    }

    let res = await fetch("https://jsonplaceholder.typicode.com/posts",config);
    let data = await res.json();
    return data;

}