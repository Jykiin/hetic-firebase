import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { signOutUser } from '@/controller/auth.controller';
import { Button } from '@mui/base';

export default function Navbar() {

  const router = useRouter();
  // Button Functions
  const handleLogout = async () => {
    await signOutUser();
    router.replace('/login')
  };
  const handleMyproducts = async () => {
    await signOutUser();
    router.replace('/myproducts')
  };
  
  const redirectPanier = () => {
    router.push('/panier');
  }
  // View
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
                    Hetic Firebase
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleMyproducts}>Mes produits</Button>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={redirectPanier}
            >
              <Badge badgeContent={2} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

