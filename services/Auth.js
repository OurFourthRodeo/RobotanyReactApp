import axios from 'axios';
import * as c from '../constants'

// gives: username, password
// return: {token, user}
export async function signin(data) {
    try {
        let res = await axios.post(c.SIGNIN, data, {withCredentials: true});
        console.log("Signin API response: " + JSON.stringify(res));
        return res.data;

    } catch (e) {
        throw handler(e)
    }
}

// gives: email, username, password
// return: {token, user}
export async function signup(data) {
    try {
        let res = await axios.post(c.SIGNUP, data);
        console.log("Signup API response: " + JSON.stringify(res));
        return res.data;
        
    } catch (e) {
        throw handler(e)
    }
}

export async function logout(data) {
    try {
        let res = await axios.post(c.SIGNOUT, data, {withCredentials: true});
        console.log("Logout API response: " + JSON.stringify(res));
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

export async function addPlant(name, mac) {
    const newPlant = { name, mac }

    try {
        console.log("Sending to API: " + newPlant.name);
        let res = await axios.post(c.ADDPLANT, newPlant, {withCredentials: true});
        return res.data;
    
    } catch (e) {
        throw handler(e)
    }
}

export async function checkLoggedIn() {
    try {
        console.log("API: Checking if logged in");
        let res = await axios.get(c.CHECK_LOGGEDIN, {withCredentials: true});
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