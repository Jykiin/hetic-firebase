import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.conf';

import CartProduct from '../components/CartProduct';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cart'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price), 0);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-6">
        <Typography className="text-white pb-4" variant="h4">MY CART</Typography>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((product, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <CartProduct key={product.id} id={product.id} title={product.title} price={product.quantity < 2 ? product.price : parseFloat(product.price)} quantity={product.quantity} size={product.size}></CartProduct>
              </div>
            ))}
            <Typography className="text-white" variant="h6">Total: {calculateTotalPrice().toFixed(2)} €</Typography>
          </div>
      ) : (
      <Typography className="text-white" variant="body1">Your cart is empty</Typography>
        )}
    </div>
    </div >
  );
}
