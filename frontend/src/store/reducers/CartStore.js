import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';
import { getCookie } from "../../services/CookieService"


const initialState = {
    carts: getCookie("carts") ? getCookie("carts") : [],
    shippingAddress: getCookie("ShippingInfo") ? getCookie("ShippingInfo") : [],
    paymentMethod: "PayPal"
    // localStorage.getItem("carts") ?
    // JSON.parse(localStorage.getItem("carts")) : [],
}

// console.log(getCookie("ShippingInfo"));
// console.log("=============================");
// console.log(JSON.parse(getCookie("ShippingInfo")));
const addToCart = (state, action) => {
    const cartItem = action.product;
    const existItem = state.carts.find(x => {
        return x._id === cartItem._id
    });

    if (existItem) {
        console.log(state.carts);
        return updateObject(state, {
            carts: state.carts.map(x => x._id === existItem._id ? cartItem : x)
        })

    } else {
        return updateObject(state, {
            carts: [...state.carts, cartItem]
        })
    }
}

const removeFromCart = (state, action) => {
    console.log("test")
    const UpdateState = {
        carts: state.carts.filter(x => x._id !== action.productId)
    }
    return updateObject(state, UpdateState);
}

const saveShipping = (state, action) => {
    return updateObject(state, {
        shippingAddress: action.payload
    });
}

const savePaymentMethod = (state, action) => {
    return updateObject(state, {
        paymentMethod: action.payload
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CART_ADD_ITEM: return addToCart(state, action);
        case actionType.CART_REMOVE_ITEM: return removeFromCart(state, action);
        case actionType.CART_SAVE_SHIPPING_ITEM: return saveShipping(state, action);
        case actionType.CART_SAVE_PAYMENT_METHOD: return savePaymentMethod(state, action)
        default:
            return state;
    }
}


export default reducer;