import { getPostId } from "./post.js"

export const getComment = async()=>{
    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/comments`);
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

    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/comments/${arg.commentId}`);
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
        let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/comments`,config);
        let data = res.json();
        return alert(JSON.stringify(arg)+`added successfuly!`);
    }else 
    return alert(`operation cancelled.`);
};

// ---------------------------------------------- fin add comments ----------------------------------------------
 const validateDeleteComments = async ({idComment})=>{
    if(typeof idComment !== "string" || idComment === undefined)
        return{
        status: 406, 
        message: `The id that was provided doesn't meet the correct argument to be found.`
        };    
};

export const deleteComments =async(fireId)=>{
    let val = validateDeleteComments(fireId);
    if(val) return val;
    let config ={
        method:"DELETE",
        headers:{"content-type": "application/json"}
    };

    let res = await fetch(`https://4d012986b9e776981f20439de390dddd.serveo.net/comments/${fireId.idComment}`,config);
    if(res.status === 404)return `id that was provided isn't registred in the database.`
    
    let data = await res.json();
    data.status = 202;
    data.message = `The album ${fireId.idComment} was deleted correctly from de database.`
    return data;
};



