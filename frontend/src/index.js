import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom"
import thunk from "redux-thunk"
import ProductReducer from "./store/reducers/ProductStore"
import CartReducer from "./store/reducers/CartStore"
import AuthReducer from "./store/reducers/AuthStore"
import OrderReducer from "./store/reducers/OrderStore"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const RootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
  auth: AuthReducer,
  order: OrderReducer
});

// const reducerProduct = FirstStore;



// const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));



const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
