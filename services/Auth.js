import axios from 'axios';
import * as c from '../constants'

// should return {token, user}
export async function signin(data) {
    try {
        let res = await axios.post(c.SIGNIN, data);
        return res.data;

    } catch (e) {
        throw handler(e)
    }
}

// should return {token, user}
export async function signup(data) {
    try {
        let res = await axios.post(c.SIGNUP, data);
        return res.data;
        
    } catch (e) {
        throw handler(e)
    }
}

export async function updateProfile(userId, data) {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        for (let key in data ) 
            form_data.append(key, data[key]);
        
        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function addPlant(name, type) {
    const newPlant = {
        plant_name: name,
        plant_type: type,
    }

    try {
        console.log("Sending to API: " + newPlant.plant_name);
        let res = await axios.post(c.ADDPLANT, newPlant);
        return res.data;
    
    } catch (e) {
        throw handler(e)
    }
}

export function handler(err) {
    let error = err;
    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}