/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prefer-arrow-callback */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import FormOrder from "../FormOrder/FormOrder";
import styles from "./modal.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalWindow({ open, setOpen }) {
  const product = useSelector((state) => state.ProductSlice.oneProduct);
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm] = useState({
    phone: "",
    name: "",
  });

  const handleClose = () => {
    setPhoneError("");
    setOpen(false);
    setForm({ phone: "", name: "" });
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"lg"}
        PaperProps={{
          style: {
            // backgroundColor: "rgba(84, 90, 121, 0.958)",
            // backgroundColor: 'rgba(128, 0, 0, 0.9)',
            backgroundColor: 'rgba(64, 64, 64, 0.958)',
            border: "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 60px var(--metal)",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle sx={{
          fontFamily: "Lato Medium, sans-serif",
          fontSize: '26px',
          textAlign: "center",
          color: 'Gold'
        }}
        >{product?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Lato Medium, sans-serif" }}
            id="alert-dialog-slide-description"
          >
            <Box
              sx={{
                display: "flex",
                width: "fit-content",
              }}
            >
              <div className={styles.textContainer}>
                <img src={product?.img} className={styles.img} />
                {/* <br /> */}
                <span className={styles.span}>Описание:</span>{"  "}
                {product?.description}
                <br />
                <span className={styles.span}>Состав:</span>{"  "}
                {product?.fullDescription}
                <br />
                <span className={styles.span}>Вес:</span>{"  "}
                {product?.weight}г.
                <br />
                <span className={styles.span}>Цена:</span>{"  "}
                {product?.price}€
              </div>
              <FormOrder
                productId={product?.id}
                open={open}
                setOpen={setOpen}
                phoneError={phoneError}
                setPhoneError={setPhoneError}
                form={form}
                setForm={setForm}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Lato Medium, sans-serif", color: 'gold' }}
            onClick={handleClose}
          >Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalWindow;
