import axios from 'axios';
import * as c from '../constants'

export async function signin(data) {
    try {
        let res = await axios.post(c.SIGNIN, data);
        return res.data;

    } catch (e) {
        throw handler(e)
    }
}

export async function signup(username, emailAddress, password) {
    const newUser = {
        username: username,
        email: emailAddress,
        password: password
      }

    try {
        let res = await axios.post(c.SIGNUP, data);
        return res.data;
        
    } catch (e) {
        throw handler(e)
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