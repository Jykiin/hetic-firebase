// import "tailwindcss/tailwind.css";
// import { Box, Typography } from "@mui/material";
// import Card from "../components/Card";
// import Navbar from '../components/Navbar'
// import CartProduct from '../components/CartProduct';
// import { useState, useEffect } from 'react';

// import { collection, query, where, getDocs } from "firebase/firestore";

// export default function Cart() {
//   // const q = query(collection(db, "cart"), where("capital", "==", true));
//   // const docSnap = await getDocs(ref);
//   // if (docSnap.exists()) {
//   //   // Convert to City object
//   //   const product = docSnap.products();
//   //   // Use a City instance method
//   //   console.log(product.toString());
//   // } else {
//   //   console.log("No such document!");
//   // }

//   // const [title, setTitle] = useState("");
//   // const [description, setDescription] = useState("");
//   // const [price, setPrice] = useState("");
//   // const [quantity, setQuantity] = useState("");
//   // const [size, setSize] = useState("");
//   // const [file, setFile] = useState(null);

//   // const displayPanier = async () => {
//   //   const docRef = await addDoc(collection(db, "products"), {
//   //     title: title,
//   //     description: description,
//   //     price: price,
//   //     image: fileUrl,
//   //     userId: userID,
//   //   });
//   // }

//   // const userCart =

  
//   // const products = [
//   //   { id: 1, title: 'Tee-shirt blanc', image: 'example.jpg', description: 'Couleur blanc ...', price: '30.99', quantity: '3', size: 'M' },
//   //   { id: 3, title: 'Tee-shirt noir', image: 'example.jpg', description: 'Couleur noire ...', price: '14.99', quantity: '1', size: 'XS' },
//   //   { id: 4, title: 'Tee-shirt beige', image: 'example.jpg', description: 'Couleur noire ...', price: '14.99', quantity: '6', size: 'S' },
//   // ]

//   // const [cartItems, setCartItems] = useState([]);

//   // useEffect(() => {
//   //   // Fonction pour récupérer les éléments du panier depuis le stockage local lors du chargement du composant
//   //   const items = getCartItemsFromLocalStorage();
//   //   setCartItems(items);
//   // }, []);

//   function totalProductPrice() {
//     console.log('totalPrice', totalPrice);
//   } 

//   return (
//     <div>
//       <Navbar />
//       <div className="flex flex-col h-screen bg-gray-900 p-12 overflow-scroll">
//         <Typography className="text-white pb-4" variant="h4">MY CART</Typography>
//         <div className="w-full h-full flex flex-row bg-gray-900 gap-6">
//           <div className="flex flex-col">
//             {cartItems.map((product) => (
//               <CartProduct key={product.id} id={product.id} title={product.title} price={product.quantity < 2 ? product.price : parseFloat(product.price * product.quantity)} quantity={product.quantity} size={product.size}></CartProduct>
//             ))}
//           </div>
//           <Box className="sticky top-0 w-[30%] h-fit bg-gray-700 text-white rounded-xl p-4">
//             <Typography className="mb-4" variant="h5">Order summary</Typography>
//             {cartItems.map((product) => (
//               <div className="flex flex-row justify-between text-sm mb-2">
//                 <Typography className="whitespace-normal mr-4">{product.title} x{product.quantity}</Typography>
//                 <Typography>{product.quantity < 2 ? product.price : parseFloat(product.price * product.quantity).toFixed(2)}€</Typography>
//               </div>
//             ))}
//             <div className="flex flex-row justify-between text-lg font-bold">
//               <Typography className="font-bold" variant="h6">Total</Typography>
//               <Typography className="font-bold" variant="h6">
//                 {totalProductPrice}€</Typography>
//             </div>
//           </Box>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { db } from '../firebase.conf'; // Im

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les éléments du panier depuis Firebase lors du chargement du composant
    const fetchCartItems = async () => {
      try {
        const cartData = [];
        const querySnapshot = await getDocs(collection(db, 'cart'));
        querySnapshot.forEach((doc) => {
          cartData.push(doc.data());
        });
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    
    fetchCartItems();
  }, []);

  // Calcul du total du panier
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-screen bg-gray-900 p-12 overflow-scroll">
        <Typography className="text-white pb-4" variant="h4">MY CART</Typography>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((product, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div>
                  <Typography className="text-white" variant="h6">{product.title}</Typography>
                  <Typography className="text-white" variant="body1">Price: {product.price} €</Typography>
                  {/* Ajoutez d'autres informations sur le produit si nécessaire */}
                </div>
                <Typography className="text-white" variant="h6">{(product.price * product.quantity).toFixed(2)} €</Typography>
              </div>
            ))}
            <Box className="bg-gray-700 text-white p-4 mt-4">
              <Typography className="text-white" variant="h6">Total: {calculateTotalPrice().toFixed(2)} €</Typography>
            </Box>
          </div>
        ) : (
          <Typography className="text-white" variant="body1">Your cart is empty</Typography>
        )}
      </div>
    </div>
  );
}

