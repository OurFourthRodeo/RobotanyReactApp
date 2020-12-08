import axios from 'axios';
import * as c from '../constants'

// error handler
export function handler(err) {
    let error = err;
    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}


/*  Parameters: {username, password, {withCredentials: true}}
    Returns:
        token - successful login
        error - malformed request */
export async function signin(data) {
    try {
        let res = await axios.post(c.SIGNIN, data, {withCredentials: true});
        console.log("Signin API response: " + JSON.stringify(res));
        return res.data;

    } catch (e) {
        throw handler(e)
    }
}

/*  Parameters: {username, email, password}
    Returns:
        token - successful login
        error - malformed request */
export async function signup(data) {
    try {
        let res = await axios.post(c.SIGNUP, data);
        console.log("Signup API response: " + JSON.stringify(res));
        return res.data;
        
    } catch (e) {
        throw handler(e)
    }
}

/*  Parameters: {withCredentials: true}
    Returns:
        success - successful login
        error - malformed request */
export async function logout(data) {
    try {
        let res = await axios.post(c.SIGNOUT, data, {withCredentials: true});
        console.log("Logout API response: " + JSON.stringify(res));
        return res.data;
        
    } catch (e) {
        throw handler(e)
    }
}

/*  Parameters: {name: plant name, mac: mac address, {withCredentials: true}}
    Returns:
        success - successly added
        error - malformed request */
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

/*  Parameters: {device}
    Returns:
        entry - device successfully added
        empty - no change
        error - malformed request */
export async function registerDevice(device) {
    try {
        console.log("API: registering device " + device)
        let res = await axios.post(c.REGISTER_DEVICE, device, {withCredentials: true});
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

/*  Parameters: {device}
    Returns:
        entry - device successfully removed
        empty - no change
        error - malformed request */
export async function unregisterDevice(device) {
    try {
        console.log("API: unregistering device " + device);
        let res = await axios.post(c.UNREGISTER_DEVICE, device);
        return res.data;
    } catch(e) {
        throw handler(e);
    }
}

/*  Parameters: {mac}
    Returns:
        success - successfully deleted
        error - malformed request */
export async function deletePlant(mac) {
    try {
        console.log("API: delete plant " + mac);
        let res = await axios.post(c.UNREGISTER_DEVICE, mac);
        return res.data;
    } catch(e) {
        throw handler(e);
    }
}



/*  Parameters: {withCredentials: true}
    Returns:
        success - if logged in
        error - if not logged in */
export async function checkLoggedIn() {
    try {
        console.log("API: Checking if logged in");
        let res = await axios.get(c.CHECK_LOGGEDIN, {withCredentials: true});
        return res.data;
    
    } catch (e) {
        throw handler(e)
    }
}

/*  Parameters: {params: {id: mac address}}
    Returns:
        object with last reading
        error - malformed request */
export async function getMoisture(id) {
    try {
        console.log("API: grabbing moisture data");
        let res = await axios.get(c.GET_MOISTURE, id);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

/*  Parameters: {params: {id: mac address}}
    Returns:
        object with photo URL
        error - malformed request */
export async function getImage(id) {
    try {
        console.log("API: grabbing latest image");
        let res = await axios.get(c.GET_IMAGE, {params: {id}, withCredentials: true});
        console.log("Image response.")
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log("API: image error");
        throw handler(e);
    }
}

/*  Paramters: {params: {all: true}}
    Returns:
        list of user's plants (MAC included) */
export async function getPlants() {
    try {
        console.log("API: grabbing list of plants");
        let res = await axios.get(c.GET_PLANTS, {params: {all: 1}, withCredentials: true});
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}





// UNUSED
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