import React from 'react'
import ProductCard from './Card'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/firebase.conf";

export default function CardsList({setQuantityInCart, setCart, cart}) {
   
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    const fetchUserAndData = async () => {
  
      const data = await getDocs(collection(db, "products"));
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchUserAndData();
  }, []);

  return (
    <div className="flex wrap gap-5 p-10">
      {products.length === 0 ? (
        <p>{" Vous n'avez pas encore d'article "} </p>
      ) : (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
            title={product.title} 
            image={product.image} 
            description={product.description} 
            price={product.price} 
            setQuantityInCart={setQuantityInCart}
            setCart={setCart}
            cart={cart}
          >
          </ProductCard>
        ))
      )}
    </div>
  );
}