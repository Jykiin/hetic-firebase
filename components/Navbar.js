import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { currentUser, signOutUser } from '@/controller/auth.controller';
import { Button } from '@mui/base';

export default function Navbar({ quantityInCart }) {
  const [userInfo, setUserInfo] = useState("");
  const router = useRouter();
  const getUserInfo = async () => {
    const userObj = await currentUser();
    setUserInfo(userObj);
  }
  useEffect(() => {
    getUserInfo();
  }, [])
  // Button Functions
  const handleLogout = async () => {  
    await signOutUser();
    router.push('/login')
  };
  const handleMyproducts = async () => {
    router.push('/my-products')
  };
  const handleMyCart = async () => {
    router.push('/painer')
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
          <a href="/">HETIC E-Commerce</a> 
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {userInfo.user?.isSeller == 1 && (<Button onClick={handleMyproducts}>Mes produits</Button>)}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={redirectPanier}
            >
              {quantityInCart > 0 ? (
                <Badge badgeContent={quantityInCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              ) : (
                <ShoppingCartIcon />
              )}
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

