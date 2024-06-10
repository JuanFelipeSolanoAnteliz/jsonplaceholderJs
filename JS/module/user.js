const validateGetUser = async(userId)=>{
    if(typeof userId !== "string" ||userId === undefined) 
        return{status: 406, message:`This user dosen't exist in the database`};
}


export const getUser = async(arg)=>{
    let val = await validateGetUser(arg);
    if(val) return val;
    
    let res = await fetch(`https://db9389c548dde0067e872319e959acc6.serveo.net/users/${arg}`);
    
    if(res.status === 404) return {status: 204, message: `Username doesn't exist`};
    
    let data = await res.json();
    return data;
};

const validateAddUser = async ({name,username,email,address,phone,website,company}) =>{

    if(typeof name !== "string" || name === undefined ) return{status:406, message:`the name doesn't have the enough requeriments to be added`};
    if(typeof username !== "string" || username === undefined ) return{status:406, message:`the username doesn't have the enough requeriments to be added`};
    if(typeof email !== "string" || email === undefined ) return{status:406, message:`the email doesn't have the enough requeriments to be added`};
    if(typeof address !== "object" || address === undefined ) return{status:406, message:`the address doesn't have the enough requeriments to be added`};
    if(typeof address.street !== "string" || address.street === undefined ) return{status:406, message:`the street doesn't have the enough requeriments to be added`};
    if(typeof address.suite !== "string" || address.suite === undefined ) return{status:406, message:`the suite doesn't have the enough requeriments to be added`};
    if(typeof address.city !== "string" ||address.city === undefined ) return{status:406, message:`the city doesn't have the enough requeriments to be added`};
    if(typeof address.zipcode !== "string" || address.zipcode === undefined ) return{status:406, message:`the zipcode doesn't have the enough requeriments to be added`};
    if(typeof address.geo.lat !== "string" ||  address.geo.lat === undefined ) return{status:406, message:`the lat doesn't have the enough requeriments to be added`};
    if(typeof address.geo.lng !== "string" ||  address.geo.lng === undefined ) return{status:406, message:`the lng doesn't have the enough requeriments to be added`};
    if(typeof phone !== "string" || phone === undefined ) return{status:406, message:`the phone doesn't have the enough requeriments to be added`};
    if(typeof website !== "string" || website === undefined ) return{status:406, message:`the website doesn't have the enough requeriments to be added`};
    if(typeof company !== "object" || company === undefined ) return{status:406, message:`the company doesn't have the enough requeriments to be added`};
    if(typeof company.nameComp !== "string" || company.nameComp === undefined ) return{status:406, message:`the name doesn't have the enough requeriments to be added`};
    if(typeof company.catchPhrase !== "string" || company.catchPhrase === undefined ) return{status:406, message:`the catchPhrase doesn't have the enough requeriments to be added`};
    if(typeof company.bs !== "string" || company.bs === undefined ) return{status:406, message:`the bs doesn't have the enough requeriments to be added`};
    
};

export const addUser = async (arg) => {
    let val = await validateAddUser(arg)
    if(val)return alert(JSON.stringify(val));

    let config={
        method:"POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify(arg)
    };
    let confirmation = confirm(`Are you sure that you want to add ${JSON.stringify(arg,null,2)} ?`)
    if(confirmation === true){
        let res = await fetch(`https://db9389c548dde0067e872319e959acc6.serveo.net/users`,config);
        let data = res.json();
        return alert(JSON.stringify(arg,null,2)+
        `Was added successfully!`)
    }
    else return alert(`Operation cancelled :[`)
};

// ----------------------------------------------------- delete user -------------------------------------------------
