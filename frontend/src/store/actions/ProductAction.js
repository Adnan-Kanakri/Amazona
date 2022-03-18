import * as actionType from "./actionsTypes";
import axios from "axios";



export const productRequest = () => {
    return {
        type: actionType.REQUEST_FETCHED_PRODUCTS,
        loading: true
    }
}


export const setProduct = (products, loading) => {
    return {
        type: actionType.SET_FETCHED_PRODUCTS,
        products: products,
        loading: loading
    }
}


export const fetchProductsFailed = (message) => {
    return {
        type: actionType.FETCH_PRODUCTS_FAILED,
        message: message
    }
}

export const fetchProduct = () => {
    return async dispatch => {
        try {
            dispatch(productRequest());
            const data = await axios.get("/api/products");
            let loading = false;
            dispatch(setProduct(data.data.data.products, loading))
        } catch (error) {
            dispatch(fetchProductsFailed(error.message))
        }
    }
}



export const productRequestDetails = (productId) => {
    return {
        type: actionType.PRODUCTS_DETAILS_REQUEST,
        payload: productId,
        loading: true
    }
}

export const productSetDetails = (product) => {
    return {
        type: actionType.PRODUCTS_DETAILS_SUCCESS,
        product: product,
        loading: false
    }
}

export const productErrorDetails = (error) => {
    console.log("error")
    return {
        type: actionType.PRODUCTS_DETAILS_FAIL,
        loading: false,
        error: error.response && error.response.data.message ?
            error.response.data.message : error.message
    }
}


export const ProductDetails = (productId) => {
    return async dispatch => {
        try {
            dispatch(productRequestDetails(productId));
            const { data } = await axios.get(`/api/products/${productId}`);
            dispatch(productSetDetails(data.data))
        } catch (error) {
            dispatch(productErrorDetails(error))
        }
    }
}




