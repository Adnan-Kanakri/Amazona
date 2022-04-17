import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';



const initialState = {
    loading: false,
    loadingOrder: true,
    success: false,
    orders: null,
    order: null,
    error: null,

}

// const initialState1 = {
//     loading: false,
//     error: null,

// }


const orderRequest = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}
const orderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        success: true,
        orders: action.payload
    })
}

const orderFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const orderResat = (state, action) => {
    return updateObject(state, {
        orders: null
    })
}


const orderDetailRequest = (state, action) => {
    console.log("test")
    return updateObject(state, {
        loadingOrder: true
    });
}

const orderDetailSuccess = (state, action) => {
    console.log(action)
    return updateObject(state, {
        loadingOrder: false,
        order: action.payload
    });
}

const orderDetailFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_ORDER_REQUEST: return orderRequest(state, action);
        case actionType.CREATE_ORDER_SUCCESS: return orderSuccess(state, action);
        case actionType.CREATE_ORDER_FAILED: return orderFailed(state, action);
        case actionType.ORDER_RESET: return orderResat(state, action);
        case actionType.ORDER_DETAIL_REQUEST: return orderDetailRequest(state, action)
        case actionType.ORDER_DETAIL_SUCCESS: return orderDetailSuccess(state, action)
        case actionType.ORDER_DETAIL_FAILED: return orderDetailFailed(state, action)
        default:
            return state;
    }
}

export default OrderReducer

// export const OrderReducerDetail = (state = initialState1, action) => {
//     switch (action.type) {

//         default:
//             return state;
//     }
// }

