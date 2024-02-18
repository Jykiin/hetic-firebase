'use client'

import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar'
import CardList from '../components/CardsList'

export default function Home() {

  const [quantityInCart, setQuantityInCart] = useState(0);

  const [cart, setCart] = useState([]);

  return (
    <div>
      <Navbar quantityInCart={quantityInCart}/>
      <CardList setQuantityInCart={setQuantityInCart} setCart={setCart} cart={cart}/>
    </div>
  );
}