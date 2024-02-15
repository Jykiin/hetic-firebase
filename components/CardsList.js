import React from 'react'
import ProductCard from './Card'

export default function CardsList() {
   
  const data = [
    {id: 1, title: 'Tee-shirt blanc', image:'example.jpg', description: 'Couleur blanc ...', price: '30€'}
  ]

  return (
    <div class="flex wrap gap-5 p-10">
      {data.map((card) => (
        <ProductCard 
          key={card.id} 
          title={card.title} 
          image={card.image}
          content={card.description} 
          prix={card.price} 
        />
      ))}
    </div>
  )
}