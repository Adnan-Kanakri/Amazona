import axios from "axios";
import * as actionType from "./actionsTypes";
import { removeCookie, setCookie } from "../../services/CookieService"



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
            setCookie("userInfo", JSON.stringify(data));
            // console.log(getCookie("userInfo"));
            // localStorage.setItem("userInfo", JSON.stringify(data.user));
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
        removeCookie("userInfo");
        removeCookie("carts");
        removeCookie("ShippingInfo");
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
        dispatch(registerRequest(email, password));
        try {
            const { data } = await axios.post("/api/users/register", { email, password, name, confirmPassword });
            console.log(data)
            dispatch(registerSuccess(data))
            dispatch(signInSuccess(data))
            setCookie("userInfo", JSON.stringify(data.user));
            localStorage.setItem("userInfo", JSON.stringify(data.user));
        } catch (error) {
            dispatch(registerErrorFailed(error));
        }
    }
}

const userDetailRequest = () => {
    return {
        type: actionType.USER_DETAIL_REQUEST
    }
}

const userDetailSuccess = (data) => {
    return {
        type: actionType.USER_DETAIL_SUCCESS,
        payload: data
    }
}

const userDetailFailed = (error) => {
    return {
        type: actionType.USER_DETAIL_FAIL,
        error: error
    }
}

export const getUserInfo = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userDetailRequest());
            const info = getState().auth
            const data = await axios.get(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${info.token}`,
                }
            });
            console.log(data.data)
            dispatch(userDetailSuccess(data.data.user));
        } catch (error) {
            const message = error.response && error.response.data.message ?
                error.response.data.message : error.message
            dispatch(userDetailFailed(message))
        }

    }
}



const userUpdateRequest = () => {
    return {
        type: actionType.USER_UPDATE_REQUEST
    }
}

const userUpdateSuccess = (data) => {
    return {
        type: actionType.USER_UPDATE_SUCCESS,
        payload: data
    }
}

const userUpdateFailed = (error) => {
    return {
        type: actionType.USER_UPDATE_FAIL,
        error: error
    }
}


export const updateUserInfo = (myData) => {
    return async (dispatch, getState) => {
        try {
            console.log(myData)
            dispatch(userUpdateRequest());
            const info = getState().auth
            const data = await axios.put(`/api/users/update`, myData, {
                headers: {
                    Authorization: `Bearer ${info.token}`,
                }
            });
            console.log(data.data)
            dispatch(userUpdateSuccess(data.data.user));
            dispatch(signInSuccess(data.data.user));
            setCookie("userInfo", data.data.user);
        } catch (error) {
            const message = error.response && error.response.data.message ?
                error.response.data.message : error.message
            dispatch(userUpdateFailed(message))
        }
    }
}

export const userUpdateReset = () => {
    return dispatch => {
        dispatch({
            type: actionType.USER_UPDATE_RESET
        })
    }
}








