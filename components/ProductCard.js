import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "tailwindcss/tailwind.css";

export default function ProductCard({ title, image, description, price}) {

  const handleAddArticle = () => {
    alert('Article ajouté au panier !')
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={ title }
      />
      <CardMedia
        component="img"
        height="194"
        image={ image }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { description }
        </Typography>
      </CardContent>
      <CardActions class="flex items-center justify-between m-3">
        <div class="text-4xl font-semibold tracking-tight">{ price } €</div>
        <IconButton onClick={handleAddArticle}>
          <ShoppingCartIcon alt="Ajouter au panier"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}