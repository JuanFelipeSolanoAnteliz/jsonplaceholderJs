export const getUser = async(arg)=>{
    let val = await validateGetUser(arg);
    if(val) return val;
    
    let res = await fetch(`https://b426bc73b31fd3e606372972aae17324.serveo.net/users/${arg.userId}`);
    
    if(res.status === 404) return {status: 204, message: `Username doesn't exist`};
    
    let data = await res.json();
    return data;
};