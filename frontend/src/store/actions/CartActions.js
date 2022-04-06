import axios from "axios";
import * as actionType from "./actionsTypes";

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
            localStorage.setItem("carts", JSON.stringify(getState().cart.carts));
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
            localStorage.setItem("carts", JSON.stringify(getState().cart.carts))
        } catch (error) {

        }
    }
}