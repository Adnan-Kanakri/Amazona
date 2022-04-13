import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';



const initialState = {
    loading: false,
    success: false,
    order: null,
    error: null
}

const orderRequest = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}
const orderSuccess = (state, action) => {
    return updateObject(state, {
        success: true,
        order: action.payload
    })
}

const orderFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const orderResat = () => {
    return {}
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_ORDER_REQUEST: return orderRequest(state, action);
        case actionType.CREATE_ORDER_SUCCESS: return orderSuccess(state, action);
        case actionType.CREATE_ORDER_FAILED: return orderFailed(state, action);
        case actionType.ORDER_RESET: return orderResat();
        default:
            return state;
    }
}

export default reducer;