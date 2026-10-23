import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './CartSlice';

const categories = [
  { name: 'Air Purifying Plants', plants: [
    ['Peace Lily', 299, 'photo-1593691509543-c55fb32e5cee'],
    ['Snake Plant', 249, 'photo-1593482892290-f54927ae2b7a'],
    ['Spider Plant', 199, 'photo-1572688484438-313a6e50c333'],
    ['Areca Palm', 399, 'photo-1512428813834-c702c7702b78'],
    ['Rubber Plant', 349, 'photo-1509423350716-97f9360b4e09'],
    ['Boston Fern', 279, 'photo-1497250681960-ef046c08a56e']
  ]},
  { name: 'Low Maintenance Plants', plants: [
    ['ZZ Plant', 349, 'photo-1501004318641-b39e6451bec6'],
    ['Jade Plant', 199, 'photo-1509423350716-97f9360b4e09'],
    ['Aloe Vera', 179, 'photo-1509423350716-97f9360b4e09'],
    ['Pothos', 229, 'photo-1497250681960-ef046c08a56e'],
    ['Lucky Bamboo', 249, 'photo-1485955900006-10f4d324d411'],
    ['Aglaonema', 329, 'photo-1459156212016-c812468e2115']
  ]},
  { name: 'Decorative Plants', plants: [
    ['Monstera', 449, 'photo-1509423350716-97f9360b4e09'],
    ['Calathea', 379, 'photo-1485955900006-10f4d324d411'],
    ['Fiddle Leaf Fig', 499, 'photo-1501004318641-b39e6451bec6'],
    ['Philodendron', 299, 'photo-1497250681960-ef046c08a56e'],
    ['Anthurium', 399, 'photo-1459156212016-c812468e2115'],
    ['Dracaena', 359, 'photo-1512428813834-c702c7702b78']
  ]}
];

const products = categories.flatMap((category, c) =>
  category.plants.map(([name, price, photo], i) => ({
    id: `${c}-${i}`, name, price, category: category.name,
    image: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=500&q=80`
  }))
);

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  return <main className="products">
    <h1>Find Your Perfect Plant</h1>
    <p className="subtitle">Bring home a little green happiness.</p>
    {categories.map(category => <section key={category.name}>
      <h2>{category.name}</h2>
      <div className="grid">
        {products.filter(p => p.category === category.name).map(p => {
          const added = items.some(item => item.id === p.id);
          return <article className="plant" key={p.id}>
            <img src={p.image} alt={p.name}
              onError={e => { e.currentTarget.src = 'https://placehold.co/400x300/e5eee5/315b3a?text=Houseplant'; }} />
            <h3>{p.name}</h3><p>₹{p.price}</p>
            <button disabled={added} onClick={() => dispatch(addToCart(p))}>
              {added ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </article>;
        })}
      </div>
    </section>)}
  </main>;
}
