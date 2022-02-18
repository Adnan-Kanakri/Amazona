import React from 'react';
import { Link, Route, Routes } from "react-router-dom"



import HomeScreen from "./components/HomeScreen/HomeScreen"
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">amazona</a>
        </div>
        <div>
          <Link to="cart">Cart</Link>
          <Link to="singing">Sing In</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>


      </main>
      <footer className="row center">All rights reserved.</footer>
    </div>
  );
}

export default App;
