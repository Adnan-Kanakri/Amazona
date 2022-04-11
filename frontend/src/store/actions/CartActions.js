import axios from "axios";
import * as actionType from "./actionsTypes";
import { setCookie } from "../../services/CookieService"

const setCart = (data, qty) => {

    const product = {
        ...data,
        qty: qty
    }
    return {
        type: actionType.CART_ADD_ITEM,
        product: product
    }
}



export const addToCart = (productId, qty) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get(`/api/products/${productId}`);
            console.log(data)
            dispatch(setCart(data.products, qty))
            setCookie("carts", JSON.stringify(getState().cart.carts));
            // localStorage.setItem("carts", JSON.stringify(getState().cart.carts));
        } catch (error) {

        }
    }
}

const removedCart = (productId) => {
    return {
        type: actionType.CART_REMOVE_ITEM,
        productId: productId

    }
}

export const removeFromCart = (productId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(removedCart(productId));
            setCookie("carts", JSON.stringify(getState().cart.carts));
            // localStorage.setItem("carts", JSON.stringify(getState().cart.carts))
        } catch (error) {

        }
    }
}

const shippingSave = (data) => {
    return {
        type: actionType.CART_SAVE_SHIPPING_ITEM,
        payload: data
    }
}

export const saveShippingAddress = (data) => {
    return async dispatch => {
        dispatch(shippingSave(data));
        setCookie("ShippingInfo", JSON.stringify(data));
    }
}

const savePayment = (payment) => {
    return {
        type: actionType.CART_SAVE_PAYMENT_METHOD,
        payload: payment
    }
}


export const savePaymentMethod = (payment) => {
    return async dispatch => {
        dispatch(savePayment(payment));
    }
}