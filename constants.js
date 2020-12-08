import React from 'react';

// API URL 
export const API_URL = 'https://robotany.queueunderflow.com';

// API endpoints (POST)
/*  Parameters: {username, password, {withCredentials: true}}
    Returns:
        token - successful login
        error - malformed request */
export const SIGNIN = `${API_URL}/api/user/v1/login`;

/*  Parameters: {username, email, password}
    Returns:
        token - successful login
        error - malformed request */
export const SIGNUP = `${API_URL}/api/user/v1/create`;

/*  Parameters: {withCredentials: true}
    Returns:
        success - successful login
        error - malformed request */
export const SIGNOUT = `${API_URL}/api/user/v1/logout`;

/*  Parameters: {name: plant name, mac: mac address, {withCredentials: true}}
    Returns:
        success - successly added
        error - malformed request */
export const ADDPLANT = `${API_URL}/api/user/v1/addPlant`;


/*  Parameters: {device}
    Returns:
        entry - device successfully added
        empty - no change
        error - malformed request */
export const REGISTER_DEVICE = `${API_URL}/api/user/v1/registerDevice`;

/*  Parameters: {device}
    Returns:
        entry - device successfully removed
        empty - no change
        error - malformed request */
export const UNREGISTER_DEVICE = `${API_URL}/api/user/v1/unregisterDevice`;

/*  Parameters: {mac}
    Returns:
        success - successfully deleted
        error - malformed request */
export const DELETE_PLANT = `${API_URL}/api/user/v1/deltePlant`; 

/* UNSUPPORTED */
export const UPDATE_PROFILE = "undecided";

/*************** < GET REQUESTS > *****************/


/*  Parameters: {withCredentials: true}
    Returns:
        success - if logged in
        error - if not logged in */
export const CHECK_LOGGEDIN = `${API_URL}/api/user/v1/username`;

/*  Parameters: {params: {id: mac address}}
    Returns:
        object with last reading
        error - malformed request */
export const GET_MOISTURE = `${API_URL}/api/plantManagement/v1/moisture`;

/*  Parameters: {params: {id: mac address}}
    Returns:
        object with photo URL
        error - malformed request */
export const GET_IMAGE = `${API_URL}/api/plantManagement/v1/photo`;

/*  Paramters: {params: {all: true}}
    Returns:
        list of user's plants (MAC included) */
export const GET_PLANTS = `${API_URL}/api/user/v1/plants`;



