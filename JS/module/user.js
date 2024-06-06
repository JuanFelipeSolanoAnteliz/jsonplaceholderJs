const validateGetUser = async ({userId})=>{
    if(typeof userId !== "string" || userId === undefined)return{status: 406, message:`This user dosen't exist in the database`};
};
 
export const getUser = async(arg)=>{
    let val = await validateGetUser(arg);
    if(val) return val;
    let res = await fetch(`https://jsonplaceholder.typicode.com/users/${arg.userId}`);
    if(res.status === 404) return {status: 204, message: `Username doesn't exist`};
    let data = await res.json();
    return data;
}