import { Card, Box, Typography, IconButton, CardMedia, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import "tailwindcss/tailwind.css";

export default function CartProduct({ id, title, image, price, quantity, size }) {
  return (
    <Card className="w-full min-w-[900px] bg-gray-700 rounded-xl h-fit mb-4 mr-8">
      <ul className="list-none w-full">
        <li className="mb-4">
          <Box className="w-full text-white p-4">
            <Box className="flex flex-row items-start">
              <CardMedia
                component="img"
                sx={{
                  width: 225,
                }}
                image={image}
                className="mr-12"
              />
              <Box className="w-full flex flex-col justify-between">
                <Box className="flex flex-row justify-between">
                  <Typography className="pb-4 font-medium" variant="h5">{title}</Typography>
                  <IconButton className="w-fit h-fit text-white">
                    <DeleteIcon style={{ color: 'white' }} />
                  </IconButton>
                </Box>
                <Box className="flex flex-row">
                  <Box className="flex flex-col min-w-[120px] pr-8">
                    <Typography className="text-sm font-medium" variant="subtitle2">Price</Typography>
                    <Typography variant="subtitle1">{price}€</Typography>
                  </Box>
                  {/* <Box className="flex flex-col min-w-[120px] pr-8">
                    <Typography className="text-sm font-medium" variant="subtitle2">Quantity</Typography>
                    <Typography variant="subtitle1">{quantity}</Typography>
                  </Box>
                  <Box className="flex flex-col min-w-[120px] pr-8">
                    <Typography className="text-sm font-medium" variant="subtitle2">Size</Typography>
                    <Typography variant="subtitle1">{size}</Typography>
                  </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </li>
      </ul>
    </Card>
  )
}