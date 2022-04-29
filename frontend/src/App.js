import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom"
import Cart from './components/Cart/Cart';
import HomeScreen from "./components/HomeScreen/HomeScreen"
import ProductDetail from './components/ProductDetail/ProductDetail';
import SignIn from './components/SignIn/SignIn';
import { signOut } from "./store/actions/authAction"
import { ArrowDropDown } from "@material-ui/icons"
import Register from './components/Register/Register';
import ShippingAddress from './components/ShippingAddress/ShippingAddress';
import PaymentMethod from './components/PaymentMethod/PaymentMethod';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import OrderDetail from './components/OrderDetail/OrderDetail';
import OrderHistory from './components/OrderHistory/OrderHistory';
import ProfilePage from './components/ProfilePage/ProfilePage';
import PrivateRoute from './services/PrivateRoute';
function App() {
  const style = {
    color: "white",
    fontSize: 20,
    display: "inline"
  }
  const cart = useSelector(state => {
    return state.cart
  })
  const { carts } = cart;
  const auth = useSelector(state => state.auth);
  const { userInfo } = auth
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  }

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          <Link to="cart">
            Cart
            {
              carts.length > 0 && (
                <span className='badge'>{carts.length}</span>
              )
            }
          </Link>
          {
            userInfo ? (
              <div className='dropdown'>
                <Link to="#">{userInfo.name}<ArrowDropDown style={style} /> </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to="/order-history">Order History</Link>
                  </li>
                  <li>
                    <Link to="/my-profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="#signup" onClick={signOutHandler}>Sign Out</Link>
                  </li>
                </ul>
              </div>

            )
              :
              (
                <Link to="signing">Sign In </Link>

              )
          }
        </div>
      </header>
      <main>
        <Routes>
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/cart/:id?qty' element={<Cart />} />
          <Route path='/signing' element={<SignIn />} />
          <Route path='/shipping' element={<ShippingAddress />} />
          <Route path='/payment' element={<PaymentMethod />} />
          <Route path='//place-order' element={<PlaceOrder />} />
          <Route path='/order/:id' element={<OrderDetail />} />
          <Route path='/register' element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/my-profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <footer className="row center">All rights reserved.</footer>
    </div >
  );
}

export default App;
