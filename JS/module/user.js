import { menu } from '../main.js';

const validateGetUser = async(userId)=>{
    if(typeof userId !== "string" ||userId === undefined) 
        return{status: 406, message:`This user dosen't exist in the database`};
}


export const getUser = async(arg)=>{
    let val = await validateGetUser(arg);
    if(val) return val;
    
    let res = await fetch(`http://172.16.101.146:5804/users/${arg}`);
    
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
        let res = await fetch(`http://172.16.101.146:5804/users`,config);
        let data = res.json();
        return alert(JSON.stringify(arg,null,2)+
        `Was added successfully!`)
    }
    else return alert(`Operation cancelled :[`)
};

// ----------------------------------------------------- delete user -------------------------------------------------


export const deleteUser =async(userId)=>{
    let val = await validateGetUser(userId);
    if(val)return val;

    let config ={
        method: "DELETE",
        headers:{"content-type":"application/json"}
    };

    let confirmation = confirm(`Are you sure that you want to delete the user with id ${userId}?`);
    if(confirmation === true){
        let res = await fetch(`http://172.16.101.146:5804/users`,config);
        return alert(`User deleted successfully!`);
    }else{
        return alert(`operation cancelled :[`)
    };
};

// -------------------------------------------- update user ------------------------------------------------------------



export const updateUser = async(userId)=>{
    let userModfified;
    while(true){
        let data = await getUser(userId)
        if(data.ok){
            alert(JSON.stringify(data,null,2))
            continue;
        };

        let listaConLlaves = []
        for(let keys in data){
            listaConLlaves.push(keys);
        };
        let indexList =[] ;
        let index = 1;
        for(let i in data){
            indexList.push(`${index++}. ${i}`)
        }let option = Number(prompt(indexList.join(`\n`)));
        if(typeof option !== "number" || option === undefined || option > listaConLlaves.length){
            alert({status:406, message:"the option is not in the valid options, try again."})
            updateUser();
        };
        if(option == 5 ){
            let addresslist = [];
            let addressIndex = []
            let index = 1;
            for(let addressKeys in data.address){
                addresslist.push([addressKeys]);
                addressIndex.push(`${index++}. ${[addressKeys]}`)
            }let addresoption = prompt(addressIndex.join(`\n`));
                if( addresoption == 5){
                    let listGeo = [];
                    let indexGeo = [];
                    let index = 1;

                    for(let geoKeys in data.address.geo){
                        listGeo.push([geoKeys]);
                        indexGeo.push(`${index++}. ${[geoKeys]}`);
                    }let geoOption= Number(prompt(indexGeo.join(`\n`)));
                    if(typeof geoOption !== "number" || geoOption === undefined || geoOption > listGeo.length){
                        alert({status:406, message:"the option is not in the valid options, try again."})
                        updateUser();
                    }
                    else{
                        let newValue = prompt(`Enter a new value to ${listGeo[geoOption-1]} `)
                        data.address.geo[listGeo[geoOption - 1]] = newValue;
                    };
                }
                else if(typeof addresoption !== "number" || addresoption === undefined || addresoption > addresslist.length){
                    alert({status:406, message:"the option is not in the valid options, try again."})
                    updateUser();
                } else{
                    let newValue = prompt(`Enter a new value to "${addresslist[addresoption-1]}"`);
                    data.address[addresslist[addresoption - 1]] = newValue;
                };
        }else if(option == 8){1
            let listCompanyKeys=[];
            let indexCompany=[];
            let index = 1;
            for(let companyKeys in data.company){
                listCompanyKeys.push([companyKeys]);
                indexCompany.push(`${index++}. ${[companyKeys]}`);
            }let optioncompany = prompt(`${indexCompany.join(`\n`)}`);
            let newValue = prompt(`enter a new value to the option selected: `);
            data.company[listCompanyKeys[optioncompany-1]]=newValue
        }
        else{
            let newValue = prompt(`Enter the new value to "${listaConLlaves[option-1]}"`)
            let selection = listaConLlaves[option-1]
            data[selection]=newValue;
        };

        let config = {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        };
        console.log(data);

        let confirmation = confirm(`are you sure that you want to update that value? \n ${JSON.stringify(userModfified)}`);
        if(confirmation=== true){
            let res = await fetch(`http://172.16.101.146:5804/users/${userId}`,config);
            data = await res.json();
            return alert(`${JSON.stringify(data)}\n Was updated successfully!`);
        }else{
            alert("operation cancelled :[")
            return menu();
        };

    };
};