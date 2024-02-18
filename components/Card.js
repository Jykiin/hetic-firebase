// import * as React from 'react';
// // import { useState } from 'react';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import "tailwindcss/tailwind.css";

// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../firebase.conf.js';

// export default function ProductCard({setQuantityInCart, setCart, cart, title, image, description, price}) {

//   // const handleAddArticle = () => {
//   //   const currentCart = [...cart];

//   //   currentCart.push({ title, price, description, image });

//   //   setCart(currentCart);

//   //   setQuantityInCart(currentCart.length);
//   // };

//   const handleAddArticle = async () => {
//     const currentCart = [...cart];
//     const newItem = { title, price, description, image };

//     currentCart.push(newItem);
//     setCart(currentCart);
//     setQuantityInCart(currentCart.length);

//     try {
//       // Ajouter le nouvel élément au panier dans la base de données Firestore
//       const cartItemsCollectionRef = collection(db, 'cartItems');
//       await addDoc(cartItemsCollectionRef, newItem);
//       console.log('Nouvel élément ajouté au panier dans Firestore.');
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout de l\'élément au panier dans Firestore:', error);
//     }
//   };


//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={ title }
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={ image }
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           { description }
//         </Typography>
//       </CardContent>
//       <CardActions class="flex items-center justify-between m-3">
//         <div class="text-4xl font-semibold tracking-tight">{ price } €</div>
//         <IconButton onClick={handleAddArticle}>
//           <ShoppingCartIcon alt="Ajouter au panier"/>
//         </IconButton>
//       </CardActions>
//     </Card>
//   );
// }
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from '../firebase.conf'; // Assurez-vous que le chemin d'importation est correct
import "tailwindcss/tailwind.css";

export default function ProductCard({ setQuantityInCart, setCart, cart, title, image, description, price }) {
  const [error, setError] = useState('');

  const handleAddArticle = async () => {
    try {
      // Ajoutez le produit à la collection 'cart' dans Firebase
      await addDoc(collection(db, 'cart'), { title, price, description, image });
      
      // Mettez à jour l'état local du panier
      const currentCart = [...cart];
      currentCart.push({ title, price, description, image });
      setCart(currentCart);
      
      // Mettez à jour la quantité dans le panier
      setQuantityInCart(currentCart.length);
    } catch (err) {
      setError('Error adding product to cart');
      console.error('Error adding product to cart:', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions class="flex items-center justify-between m-3">
        <div class="text-4xl font-semibold tracking-tight">{price} €</div>
        <IconButton onClick={handleAddArticle}>
          <ShoppingCartIcon alt="Ajouter au panier" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
