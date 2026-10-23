import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import cartReducer from './CartSlice';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

const store = configureStore({ reducer: { cart: cartReducer } });

function Shop() {
  const [page, setPage] = useState('home');
  const count = useSelector(state => state.cart.items.reduce((sum, p) => sum + p.quantity, 0));
  const goTo = page => { setPage(page); window.scrollTo(0, 0); };

  return <>
    {page === 'home' ? <main className="hero">
      <div className="hero-content">
        <p className="eyebrow">GROW SOMETHING BEAUTIFUL</p>
        <h1>Paradise Nursery</h1>
        <p>Bring nature home. Find plants that make your space feel alive.</p>
        <button onClick={() => goTo('plants')}>Get Started</button>
        <button className="secondary" onClick={() => goTo('about')}>About Us</button>
      </div>
    </main> : <>
      <nav className="navbar">
        <strong onClick={() => goTo('home')}>🌿 Paradise Nursery</strong>
        <div>
          <button onClick={() => goTo('home')}>Home</button>
          <button onClick={() => goTo('plants')}>Plants</button>
          <button onClick={() => goTo('cart')}>Cart ({count})</button>
        </div>
      </nav>
      {page === 'plants' && <ProductList />}
      {page === 'cart' && <CartItem goTo={goTo} />}
      {page === 'about' && <AboutUs />}
    </>}
    <footer>© 2026 Paradise Nursery · Grow green, live well.</footer>
  </>;
}

export default function App() {
  return <Provider store={store}><Shop /></Provider>;
}
