import axios from "axios";
import * as actionType from "./actionsTypes";
import { removeCookie } from "../../services/CookieService"

const orderRequest = () => {
    return {
        type: actionType.CREATE_ORDER_REQUEST
    }
}

const orderFailed = (error) => {
    return {
        type: actionType.CREATE_ORDER_FAILED,
        error: error.response && error.response.data.message ?
            error.response.data.message : error.message
    }
}

const orderSuccess = (data) => {
    return {
        type: actionType.CREATE_ORDER_SUCCESS,
        payload: data

    }
}

export const orderResat = () => {
    return {
        type: actionType.ORDER_RESET,
    }
}

const cartEmpty = () => {
    return {
        type: actionType.CART_EMPTY,
    }
}


export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            console.log(order)
            const info = getState().auth
            dispatch(orderRequest());
            const  data  = axios.post("/api/orders/order", order, {
                headers: {
                    Authorization: `Bearer ${info.token}`,
                }
            })
            dispatch(orderSuccess((await data).data.order));
            // dispatch(cartEmpty());
            // removeCookie("carts")
        } catch (error) {
            dispatch(orderFailed(error))
        }
    }
}