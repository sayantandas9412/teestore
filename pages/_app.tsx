import "../styles/globals.css";
import type { AppProps } from "next/app";
import { extendTheme, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import ChakraModal from "../components/Modal";
import { Data } from ".";

const colors = {
  background: {
    100: "#eeeeee87",
    200: "#eee",
    300: "#ff4500b5",
  },
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  primary: {
    heading: "sans-serif cursive",
  },
};
const theme = extendTheme({ colors, fonts });
let cartItems: Data[] = [];

function MyApp({ Component, pageProps }: AppProps) {
  const [quantity, setQuantity] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);
  const [disableAddCartButton, setDisableAddCartButton] = useState(false);
  const [cartState, setCartState] = useState({ data: [] });
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let itemPresentInCart;
  const handleAddCartClick = (id: number, state: any, setState: any) => {
    onOpen();
    setShowQuantity(true);
    setDisableAddCartButton(true);
    const cartItem = state
      .filter((item: any) => item.id === id)
      .map((item: any) => {
        return { ...item, disabled: true };
      });

    setCartState((prevState): any => {
      return { data: [...prevState.data, cartItem[0]] };
    });
    const result = state.map((data: any) => {
      if (data.id === id) {
        return { ...data, disabled: true };
      } else return data;
    });
    itemPresentInCart = cartState.data.filter(
      (child: any) => child.id === cartItem[0].id
    );
    if (itemPresentInCart.length !== 0) {
      setShowModal(true);
      itemPresentInCart = [];
    } else setShowModal(false);
    let filter = [];
    // cartItems = [...cartItems, state.filter((item: any) => item.id === id)];
    cartItems.push(...cartItem);
    setState(result);
    cartItems = cartItems.filter(
      (value, index, array) =>
        index === array.findIndex((child) => child.id === value.id)
    );
    setQuantity(cartItems.length);
    itemPresentInCart = cartState.data.filter(
      (child: any) => child.id === cartItem[0].id
    );
  };
  // useEffect(() => {}, [cartState]);

  return (
    <ChakraProvider theme={theme}>
      <BaseComponent quantity={quantity} showQuantity={showQuantity}>
        <Component
          {...pageProps}
          quantity={quantity}
          handleAddCartClick={handleAddCartClick}
          disableAddCartButton={disableAddCartButton}
          showModal={showModal}
          modalIsOpen={isOpen}
          modalOnClose={onClose}
          cartItems={cartItems}
        />
      </BaseComponent>
    </ChakraProvider>
  );
}

export default MyApp;
