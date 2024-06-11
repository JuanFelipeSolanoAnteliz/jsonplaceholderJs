import { getPostId } from "./post.js"

export const getComment = async()=>{
    let res = await fetch(`http://172.16.101.146:5801/comments`);
    let data = await res.json();
    return data;
};
const validateGetcomment = async ({commentId}) => {
    if(typeof commentId !== "string" || commentId === undefined)
        return {
        status:406, 
        message: `This user dosen't exist in the database`
        };
};
export const getCommentId = async (arg) =>{
    let val = await validateGetcomment(arg);
    if(val)return val;
    let res = await fetch(`http://172.16.101.146:5801/comments/${arg.commentId}`);
    let data = await res.json();
    return data;

};
// ------------------------------------------------------- fin get comment -----------------------------------------------
const  validateAddComment = async ({postId,name,email,body}) =>{
    if(typeof postId !== "string" || postId === undefined) return{status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof name !== "string" || name ===undefined) return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof email !== "string" || email ===undefined) return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};
    if(typeof body !== "string" || body ===undefined) return {status: 406, message: `The data ${typeof userId} is not arriving or does not...`};

    let post = await getPostId({postId});
    if(post.status === 204)return {status: 200, message: `the user searched not was found`}
};

export const addComment = async (arg) =>{

    let val = await validateAddComment(arg);
    if(val) return val;
    let config ={
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    };
    let confirmation = confirm(`Are you sure that you want to add ${JSON.stringify(arg)} ?`);
    if(confirmation === true){
        let res = await fetch(`http://172.16.101.146:5801/comments`,config);
        let data = res.json();
        return alert(JSON.stringify(arg)+`added successfuly!`);
    }else 
    return alert(`operation cancelled.`);
};

// ---------------------------------------------- fin add comments ----------------------------------------------

const validateDelete=async(id)=>{
    let res = await fetch(`http://172.16.101.146:5801/comments/${id}`)
    if(!res.ok)
        return {
                status:204,
                message:`The comment with id ${id} wasn't found min the database :/`
               };
};

export const deleteComments = async (idComment)=>{
    let val= await validateDelete(idComment);
    if(val) return val;

    let config={
        method: "DELETE",
        hraders:{"content-type": "application/json"}
    };
    let confirmation = confirm(`are you sure that you want to delete the comment with id ${idComment}?`);
    if(confirmation===true){
        let res = await fetch(`http://172.16.101.146:5801/comments/${idComment}`,config);
        let data = res.json();
        return `${JSON.stringify(data)} was deleted successfully!`
    }
    else return `operacion cancelada :[`
};

 