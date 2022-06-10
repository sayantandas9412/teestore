import "../styles/globals.css";
import type { AppProps } from "next/app";
import { extendTheme, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import BaseComponent from "../components/BaseComponent/BaseComponent";
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
    heading: `'Josefin Sans', sans-serif `,
  },
};
const theme = extendTheme({ colors, fonts });

function MyApp({ Component, pageProps }: AppProps) {
  const [quantity, setQuantity] = useState(0);
  const [disableAddCartButton, setDisableAddCartButton] = useState(false);
  const [cartState, setCartState] = useState({ data: [] });
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let itemPresentInCart;
  const handleAddCartClick = (id: number, state: Data[], setState: any) => {
    onOpen();
    setDisableAddCartButton(true);
    const cartItem = state
      .filter((item: Data) => item.id === id)
      .map((item: Data) => {
        return { ...item, disabled: true, orderedQuantity: 1 };
      });

    itemPresentInCart = cartState.data.filter(
      (child: Data) => child.id === cartItem[0].id
    );
    setCartState((prevState: any) => {
      if (itemPresentInCart.length === 0) {
        return { data: [...prevState.data, cartItem[0]] };
      } else return { data: prevState.data };
    });
    const result = state.map((data: Data) => {
      if (data.id === id) {
        return { ...data, disabled: true };
      } else return data;
    });

    if (itemPresentInCart.length !== 0) {
      setShowModal(true);
      itemPresentInCart = [];
    } else setShowModal(false);
    setState(result);

    itemPresentInCart = cartState.data.filter(
      (child: Data) => child.id === cartItem[0].id
    );
  };
  useEffect(() => {
    setQuantity(cartState.data.length);
  }, [cartState]);

  return (
    <ChakraProvider theme={theme}>
      <BaseComponent quantity={quantity}>
        <Component
          {...pageProps}
          quantity={quantity}
          handleAddCartClick={handleAddCartClick}
          disableAddCartButton={disableAddCartButton}
          showModal={showModal}
          modalIsOpen={isOpen}
          modalOnClose={onClose}
          setCartState={setCartState}
          cartState={cartState.data}
        />
      </BaseComponent>
    </ChakraProvider>
  );
}

export default MyApp;
