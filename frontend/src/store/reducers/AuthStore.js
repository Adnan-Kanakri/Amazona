import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';
import { getCookie } from "../../services/CookieService"

const initialState = {
    loading: false,
    userInfo: getCookie("userInfo") ? getCookie("userInfo").user : null,
    error: null,
    token: getCookie("userInfo") ? getCookie("userInfo").token : null,
    loadingUser: true,
    success: false
    // singleUser: null
}



const signInRequest = (state, action) => {
    const UpdateState = {
        loading: true
    }
    return updateObject(state, UpdateState);
}

const signInSuccess = (state, action) => {
    console.log("request")
    const UpdateState = {
        userInfo: action.payload.user,
        token: action.payload.token
    }
    return updateObject(state, UpdateState);
}

const signInErrorRequest = (state, action) => {
    const UpdateState = {
        error: action.error
    }
    return updateObject(state, UpdateState);
}

const registerRequest = (state, action) => {
    const UpdateState = {
        loading: true
    }
    return updateObject(state, UpdateState);
}

const registerSuccess = (state, action) => {
    console.log("request")
    const UpdateState = {
        userInfo: action.payload.user,
        token: action.payload.token
    }
    return updateObject(state, UpdateState);
}

const registerErrorRequest = (state, action) => {
    const UpdateState = {
        error: action.error
    }
    return updateObject(state, UpdateState);
}

const logOutUser = () => {
    return {}
}

const userDetailRequest = (state, action) => {
    return updateObject(state, {
        loadingUser: true,
    })
}

const userDetailSuccess = (state, action) => {
    return updateObject(state, {
        loadingUser: false,
        userInfo: action.payload
    })
}

const userDetailFailed = (state, action) => {
    return updateObject(state, {
        loadingUser: false,
        error: action.error
    })
}


const userUpdateRequest = (state, action) => {
    return updateObject(state, {
        loadingUser: true,
    })
}

const userUpdateSuccess = (state, action) => {
    return updateObject(state, {
        loadingUser: false,
        success: true
    })
}

const userUpdateFailed = (state, action) => {
    return updateObject(state, {
        loadingUser: false,
        error: action.error
    })
}

const userUpdateReset = () => {
    return {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.USER_SIGN_IN_REQUEST: return signInRequest(state, action);
        case actionType.USER_SIGN_IN_SUCCESS: return signInSuccess(state, action);
        case actionType.USER_SIGN_IN_FAIL: return signInErrorRequest(state, action);
        case actionType.USER_REGISTER_REQUEST: return registerRequest(state, action);
        case actionType.USER_REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionType.USER_REGISTER_FAIL: return registerErrorRequest(state, action);
        case actionType.USER_SIGN_OUT: return logOutUser();
        case actionType.USER_DETAIL_REQUEST: return userDetailRequest(state, action);
        case actionType.USER_DETAIL_SUCCESS: return userDetailSuccess(state, action);
        case actionType.USER_DETAIL_FAIL: return userDetailFailed(state, action);
        case actionType.USER_UPDATE_REQUEST: return userUpdateRequest(state, action);
        case actionType.USER_UPDATE_SUCCESS: return userUpdateSuccess(state, action);
        case actionType.USER_UPDATE_FAIL: return userUpdateFailed(state, action);
        case actionType.USER_UPDATE_RESET: return userUpdateReset();

        default:
            return state;
    }
}

export default reducer;