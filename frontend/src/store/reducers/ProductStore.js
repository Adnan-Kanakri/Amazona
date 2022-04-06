import * as actionType from "../actions/actionsTypes";
import updateObject from '../Utility';

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null
}

const setProducts = (state, action) => {
    return updateObject(
        state,
        { products: action.products, loading: action.loading }
    );
}

const setLoadingRequest = (state, action) => {
    return updateObject(state, { loading: action.loading });
}

const setErrorRequest = (state, action) => {
    return updateObject(state, { error: action.message });
}

const failProductDetails = (state, action) => {
    return updateObject(state, { error: action.error, loading: action.loading });
}

const setProductDetails = (state, action) => {
    return updateObject(state, {
        product: action.product,
        loading: action.loading
    })
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.REQUEST_FETCHED_PRODUCTS: return setLoadingRequest(state, action);
        case actionType.FETCH_PRODUCTS_FAILED: return setErrorRequest(state, action);
        case actionType.SET_FETCHED_PRODUCTS: return setProducts(state, action);
        case actionType.PRODUCTS_DETAILS_REQUEST: return setLoadingRequest(state, action);
        case actionType.PRODUCTS_DETAILS_SUCCESS: return setProductDetails(state, action);
        case actionType.PRODUCTS_DETAILS_FAIL: return failProductDetails(state, action);
        default:
            return state;
    }
}


export default reducer;