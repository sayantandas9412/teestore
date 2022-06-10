import { Box, Heading, HStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { Data } from ".";
import CartItem from "../components/CartItem";

export interface CartPageProps {
  cartState: Data[];
  setCartState: any;
}

const Cart: FC<CartPageProps> = ({ cartState, setCartState }) => {
  const [totalCartValue, setTotalCartValue] = useState(0);

  // get the total cart value on mount

  useEffect(() => {
    const cartValue = cartState.reduce(
      (previousValue: number, currentValue: Data) => {
        return (
          previousValue + currentValue.price * currentValue.orderedQuantity
        );
      },
      totalCartValue
    );
    setTotalCartValue(cartValue);
  }, []);

  return (
    <Box
      maxHeight="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading as="h3" size="lg" mt="4rem">
        Cart
      </Heading>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        my="2rem"
      >
        {cartState.map((item: Data, index: number) => (
          <CartItem
            key={index}
            totalCartValue={totalCartValue}
            setTotalCartValue={setTotalCartValue}
            item={item}
            cartState={cartState}
            setCartState={setCartState}
            orderedQuantity={item.orderedQuantity ?? 1}
          />
        ))}
      </Box>

      {cartState.length !== 0 && totalCartValue != 0 && (
        <HStack mb="3rem">
          <Heading size="md" data-test-element="cart-price">
            Total Cart Value:{" "}
            <span style={{ color: "#1515c5a8" }}>Rs {totalCartValue}</span>
          </Heading>
        </HStack>
      )}
      {cartState.length === 0 || totalCartValue === 0 ? (
        <Heading size="lg" data-test-id="action-error">
          Cart is empty! Keep shopping
        </Heading>
      ) : null}
    </Box>
  );
};

export default Cart;
