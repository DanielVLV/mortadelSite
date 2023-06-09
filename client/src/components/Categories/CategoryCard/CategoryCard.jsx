/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import { addFav } from "../../../redux/product.slice";
import { addIntoCart } from "../../../redux/CartRedux/cart.actions";
import { domainAddress } from "../../../constants/api";

function CategoryCard({
  product,
  onlyProductIdsFromFavs,
  setFavs,
  allFavs,
  loading,
}) {
  const user = useSelector((state) => state.UserSlice.value);
  const productId = product.id;
  const dispatch = useDispatch();

  const [isInFav, setIsInFav] = useState(false);

  useEffect(() => {
    setIsInFav(Boolean(allFavs.find((el) => el.productId === product.id)));
  }, [loading]);

  const handleAddToFavs = async () => {
    try {
      const res = await fetch(`${domainAddress}/api/favs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, user }),
      });
      const result = await res.json();
      setFavs((prev) => [...prev, result[0]]);
      setIsInFav((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const favObj = allFavs.find((el) => el.productId === productId);
  const favId = favObj?.id;
  const handleClickAddToCart = () => {
    dispatch(addIntoCart(product));
  };

  const handleFavDelete = async () => {
    try {
      const res = await fetch(`${domainAddress}/api/favs`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favId }),
      });
      if (res.status === 200) {
        setFavs((prev) => [...prev].filter((elem) => elem.id !== favId));
        setIsInFav((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{ mb: 1, mt: 1 }}
      style={{
        border: "1px solid grey",
        borderRadius: '20px',
        backgrounCol: 'black' }}
    >
      <Card sx={{
        backgroundColor: "rgba(67, 71, 92, 0.900)",
        borderRadius: '20px' }}
      >
        <Box style={{ display: "flex" }}>
          <Box style={{ display: "flex" }}>
            <CardMedia
              sx={{
                maxWidth: 250,
                display: "flex",
                borderRadius: '20px',
              }}
              component="img"
              // height="100%"
              image={product?.img}
              alt=""
            />
            <CardContent sx={{ flex: 1, m: 0, width: "900px" }}>
              <Typography
                gutterBottom
                variant="h6"
                align="center"
                sx={{
                  fontFamily: 'Lato Medium, sans-serif',
                  color: 'gold' }}
              >
                {product?.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{
                  fontFamily: 'Comfortaa, sans-serif',
                  color: 'gold' }}
              >
                {product?.description}
              </Typography>
              <Button
                sx={{ mt: 7,
                  ml: 3,
                  color: 'gold',
                  fontFamily: 'Lato Medium, sans-serif',
                  border: '1px solid gold',
                  maxHeight: '50px',
                  minWidth: '25%',
                  textAlign: 'center',
                  "&:hover": { backgroundColor: 'rgba(82, 122, 83, 0.801)' }
                }}
                variant="outlined"
                onClick={handleClickAddToCart}
              >
                В корзину
                <ShoppingCartIcon />
              </Button>
              {user &&
                (isInFav ? (
                  <Button
                    sx={{ mt: 7,
                      mr: 3,
                      ml: 3,
                      color: 'gold',
                      backgroundColor: "rgba(82, 122, 83, 0.801)",
                      fontFamily: 'Lato Medium, sans-serif',
                      border: '1px solid gold',
                      maxHeight: '50px',
                      minWidth: '25%',
                      textAlign: 'center',
                      "&:hover": {
                        backgroundColor: "rgba(154, 89, 89, 0.801)"
                      } }}
                    onClick={handleFavDelete}
                    variant="contained"
                    endIcon={<StarHalfIcon />}
                  >
                    Удалить из избранного
                  </Button>
                ) : (
                  <Button
                    sx={{ mt: 7,
                      mr: 3,
                      ml: 3,
                      color: 'gold',
                      fontFamily: 'Lato Medium, sans-serif',
                      border: '1px solid gold',
                      maxHeight: '50px',
                      minWidth: '25%',
                      textAlign: 'center',
                      "&:hover": { backgroundColor: "rgba(82, 122, 83, 0.801)" } }}
                    onClick={handleAddToFavs}
                    variant="outlined"
                    endIcon={<StarHalfIcon />}
                  >
                    В избранное
                  </Button>
                ))}
            </CardContent>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default CategoryCard;
