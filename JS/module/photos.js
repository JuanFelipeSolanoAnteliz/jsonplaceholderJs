import { getAlbumId, getAllbums, } from "./albums.js";
import { menu } from '../main.js';


export const getPhotos = async () => {

    let res = await fetch("http://172.16.101.146:5803/photos");
    let data = await res.json();
    return data;

};

export const getPhotosId = async (idPhoto) => {
    let res = await fetch(`http://172.16.101.146:5803/photos/${idPhoto}`);
    if (!res.ok) return {
        status: 204,
        message: `The id wasn't found`
    }
    else {
        let data = await res.json();
        return alert(JSON.stringify(data));
    };
};



const validateAddPhotos = async ({ idAlbum, title, url, thumbnailUrl }) => {

    if (typeof idAlbum !== "string" || idAlbum === undefined)
        return { status: 406, message: `The data ${typeof userId} is not arriving.` };
    if (typeof title !== "string" || title === undefined)
        return { status: 406, message: `The data ${typeof userId} is not arriving.` };
    if (typeof url !== "string" || url === undefined)
        return { status: 406, message: `The data ${typeof userId} is not arriving.` };
    if (typeof thumbnailUrl !== "string" || thumbnailUrl === undefined)
        return { status: 406, message: `The data ${typeof userId} is not arriving.` };

    let album = await getAlbumId({ idAlbum });
    if (album.status === 204) return { status: 200, message: `the user searched not was found` }
};

export const addPhotos = async (newPhoto) => {
    let val = await validateAddPhotos(newPhoto);
    if (val) return val;
    let config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newPhoto)
    };
    let confirmation = confirm(`Are you sure that you want to add this photo?`)
    if (confirmation === true) {

        let res = await fetch("http://172.16.101.146:5803/photos", config);
        let data = res.json();
        return alert(JSON.stringify(newPhoto) + ` was added successfuly!`);
    } else return `operation cacelled :[`
};
//-----------------------fin add Photos------------

const validateDeletePhotos = async (idPhoto) => {
    let res = await fetch(`http://172.16.101.146:5803/photos/${idPhoto}`)
    if (!res.ok) return { status: 204, message: `Id wasn't found in the database` }
};

export const deletePhotos = async (firePhoto) => {

    let val = await validateDeletePhotos(firePhoto);
    if (val) return alert(JSON.stringify(val));
    let config = {
        method: "DELETE",
        headers: { "content-type": "application/json" }
    };
    let confirmation = confirm(`Are you sure that you want to delete the data with id ${firePhoto} ?`)
    if (confirmation === true) {

        let res = await fetch(`http://172.16.101.146:5803/photos/${firePhoto}`, config);
        if (res.status === 404) return `id that was provided isn't registred in the database.`

        let data = await res.json();
        data.status = 202
        data.message = `The album ${firePhoto} was deleted correctly from de database.`
        return alert(` ${firePhoto} Was deleted successfuly!`);
    } else {
        alert(`Operation cancelled :[`);
        menu();
    };
};


const getToUpdate = async (idPhoto) => {
    let res = await fetch(`http://172.16.101.146:5803/photos/${idPhoto}`);
    if (res.status === 200) {
        let data = res.json();
        return data;
    } else return { status: 406, message: `the id photo wasn't found in the database` };
};

export const updatePhoto = async (idPhoto) => {
    let data = await getToUpdate(idPhoto);
    if (data) {
        let photoKeys = [];
        let indexPhoto = [];
        let index = 1;

        for (let keys in data) {
            photoKeys.push(keys);
            indexPhoto.push(`${index++}. ${[keys]}`)
        } let optionPhoto = Number(prompt(`Select one value: \n${indexPhoto.join(`\n`)}`));
        if (typeof optionPhoto !== "number" || optionPhoto > photoKeys.length + 1 || optionPhoto === undefined) {
            return alert(`wrong value`)
        } else if (optionPhoto === 1) {
            return alert(`Sorry, this data is immutable :[ `)
        } else {
            let newValue = prompt(`Enter a new value to ${[photoKeys[optionPhoto - 1]]}`);
            data[photoKeys[optionPhoto - 1]] = newValue;
            let config = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            };
            let confirmation = confirm(`are you sure that you want to update this data?`);
            if (confirmation === true) {
                let res = await fetch(`http://172.16.101.146:5803/photos/${idPhoto}`, config);
                if (res.status === 200)
                    return alert(`${JSON.stringify(data, null, 2)}\nWas added successfully!`);
            } else return alert(`operation cancelled :[]`);
        };
    };
};