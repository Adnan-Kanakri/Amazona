import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';

const initialState = {
    carts: localStorage.getItem("carts") ?
        JSON.parse(localStorage.getItem("carts")) : [],
}

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




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CART_ADD_ITEM: return addToCart(state, action);
        case actionType.CART_REMOVE_ITEM: return removeFromCart(state, action);
        default:
            return state;
    }
}


export default reducer;