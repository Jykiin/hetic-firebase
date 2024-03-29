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
import { db } from '../firebase.conf';
import "tailwindcss/tailwind.css";

export default function ProductCard({ setQuantityInCart, setCart, cart, title, image, description, price }) {
  const [error, setError] = useState('');

  const handleAddArticle = async () => {
    try {
    
      await addDoc(collection(db, 'cart'), { title, price, description, image });
      
  
      const currentCart = [...cart];
      currentCart.push({ title, price, description, image });
      setCart(currentCart);
      

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
        className='max-h-40'
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
