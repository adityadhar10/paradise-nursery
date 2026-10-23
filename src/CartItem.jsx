import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from './CartSlice';

export default function CartItem({ goTo }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <main className="cart">
    <h1>Your Shopping Cart</h1>
    {items.length === 0 ? <p>Your cart is empty. Let's find a plant!</p> :
      items.map(item => <article className="cart-row" key={item.id}>
        <img src={item.image} alt={item.name} />
        <div className="cart-details">
          <h3>{item.name}</h3><p>Unit price: ₹{item.price}</p>
          <p>Item total: ₹{item.price * item.quantity}</p>
          <div className="quantity">
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
            <button className="delete" onClick={() => dispatch(removeFromCart(item.id))}>Delete</button>
          </div>
        </div>
      </article>)
    }
    <h2>Total: ₹{total}</h2>
    <div className="cart-actions">
      <button onClick={() => window.alert('Checkout Coming Soon!')}>Checkout</button>
      <button className="secondary" onClick={() => goTo('plants')}>Continue Shopping</button>
    </div>
  </main>;
}
