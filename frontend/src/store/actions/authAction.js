import axios from "axios";
import * as actionType from "./actionsTypes";

export const signInRequest = (email, password) => {
    return {
        type: actionType.USER_SIGN_IN_REQUEST,
        payload: {
            email, password
        }
    }
}

export const signInSuccess = (data) => {
    return {
        type: actionType.USER_SIGN_IN_SUCCESS,
        payload: data
    }
}


export const signInErrorFailed = (error) => {
    return {
        type: actionType.USER_SIGN_IN_FAIL,
        error: error.response && error.response.data.message ?
            error.response.data.message : error.message
    }
}


export const singIn = (email, password) => {
    return async dispatch => {
        dispatch(signInRequest(email, password));
        try {
            const { data } = await axios.post("/api/users/signIn", { email, password });
            console.log(data)
            dispatch(signInSuccess(data))
            localStorage.setItem("userInfo", JSON.stringify(data.user));
        } catch (error) {
            dispatch(signInErrorFailed(error));
        }
    }
}

export const signOutSuccess = () => {
    return {
        type: actionType.USER_SIGN_OUT,
    }
}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("carts");
        dispatch(signOutSuccess())
    }
}







export const registerRequest = (email, password, name) => {
    return {
        type: actionType.USER_REGISTER_REQUEST,
        payload: {
            email, password, name
        }
    }
}

export const registerSuccess = (data) => {
    return {
        type: actionType.USER_REGISTER_SUCCESS,
        payload: data
    }
}


export const registerErrorFailed = (error) => {
    return {
        type: actionType.USER_REGISTER_FAIL,
        error: error.response && error.response.data.message ?
            error.response.data.message : error.message
    }
}

export const singUp = (email, password, name, confirmPassword) => {
    return async dispatch => {
        dispatch(registerRequest( email, password));
        try {
            const { data } = await axios.post("/api/users/register", { email, password, name, confirmPassword });
            console.log(data)
            dispatch(registerSuccess(data))
            dispatch(signInSuccess(data))
            localStorage.setItem("userInfo", JSON.stringify(data.user));
        } catch (error) {
            dispatch(registerErrorFailed(error));
        }
    }
}



