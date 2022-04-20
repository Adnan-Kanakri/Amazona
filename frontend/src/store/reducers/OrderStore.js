import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';



const initialState = {
    loading: false,
    loadingOrder: true,
    ordersRequest: [],
    success: false,
    orders: null,
    order: null,
    error: null,

}

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

const orderMineListRequest = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const orderMineListSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        ordersRequest: action.payload,
    })
}

const orderMineListFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
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
        case actionType.ORDER_MINE_LIST_REQUEST: return orderMineListRequest(state, action)
        case actionType.ORDER_MINE_LIST_SUCCESS: return orderMineListSuccess(state, action)
        case actionType.ORDER_MINE_LIST_FAILED: return orderMineListFailed(state, action)
        default:
            return state;
    }
}

export default OrderReducer



