import axios from 'axios';
import { Buffer } from "buffer";
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
        console.log("API: logging in: " + data);
        let res = await axios.post(c.SIGNIN, data, {withCredentials: true});
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
        console.log("API: Logging in " + data);
        let res = await axios.post(c.SIGNUP, data);
        return res.data;
        
    } catch (e) {
        throw handler(e)
    }
}

/*  Parameters: {withCredentials: true}
    Returns:
        success - successful login
        error - malformed request */
export async function logout() {
    try {
        console.log("API: Logging out.");
        let res = await axios.post(c.SIGNOUT, {withCredentials: true});
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
export async function registerDevice(device_) {
    try {
        console.log("API: registering device " + device_)
        let res = await axios.post(c.REGISTER_DEVICE, {device: device_}, {withCredentials: true});
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
export async function unregisterDevice(device_) {
    try {
        console.log("API: unregistering device " + device_);
        let res = await axios.post(c.UNREGISTER_DEVICE, {device: device_}, {withCredentials: true});
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
        console.log("API: grabbing moisture data for ID", id);
        let res = await axios.get(c.GET_MOISTURE, { params: {id}, withCredentials: true });
        if(res && res.data){
            return res.data;
        }
        else{
            return 0;
        }
    } catch (e) {
        throw handler(e);
    }
}

export async function getMultipleMoisture(id, number) {
    try {
        console.log("API: grabbing moisture data for ID", id, "with this many values:", number);
        let res = await axios.get(c.GET_MOISTURE, { params: {id, number}, withCredentials: true });
        if(res && res.data){
            return res.data;
        }
        else{
            return 0;
        }
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
        //console.log("API: grabbing latest image");
        let res = await axios.get(c.GET_IMAGE, {params: {id}, withCredentials: true});
        //console.log("Image response.")
        //console.log(res.data);
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

export async function connectPlant(ssid, password){
    var startCmd = new Buffer([0x08, 0x02, 0x62, ssid.length+password.length+4, 0x0a, ssid.length]);
    var ssidBuf = Buffer.from(ssid, 'utf-8');
    var passPrepBuf = new Buffer([0x12, password.length]);
    var passBuf = Buffer.from(password, "utf-8");
    var totalBuf = Buffer.concat([startCmd, ssidBuf, passPrepBuf, passBuf]);
    console.log(totalBuf.toString('hex'));
    endpoint = "http://192.168.4.1/prov-config"
    console.log("API: connecting plant to WiFi")
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"};
    await fetch(endpoint, {method: 'POST', body: totalBuf, headers})
    var confirmBuf = new Buffer([0x08, 0x04]);
    await fetch(endpoint, {method: 'POST', body: confirmBuf, headers})
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