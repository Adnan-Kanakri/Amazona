import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom"

import Cart from './components/Cart/Cart';
import HomeScreen from "./components/HomeScreen/HomeScreen"
import ProductDetail from './components/ProductDetail/ProductDetail';
import SignIn from './components/SignIn/SignIn';

function App() {

  const cart = useSelector(state => {
    return state.cart
  })
  const { carts } = cart;
  // console.log(carts)
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
          <Link to="singing">Sing In</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/cart/:id?qty' element={<Cart />} />
          <Route path='/singing' element={<SignIn />} />
          <Route path="/product/:id" element={<ProductDetail />}>
          </Route>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <footer className="row center">All rights reserved.</footer>
    </div>
  );
}

export default App;
