import { Box, Heading, HStack, Select, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Data } from ".";

export interface CartPageProps {
  cartItems: Data[];
}

const cart: FC<CartPageProps> = ({ cartItems }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalCartValue, setTotalCartValue] = useState(0);
  let itemPrice = totalCartValue;
  let initialQuantity = 1;
  let cartItemPrice = totalCartValue;

  useEffect(() => {
    const cartValue = cartItems.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      totalCartValue
    );
    setTotalCartValue(cartValue);
  }, []);

  const mapCartItems = cartItems.map((item, index) => {
    const mapOptionForItem = Array(item.quantity)
      .fill(item.quantity)
      .map((child, index) => {
        return (
          <option value={index + 1} key={index}>
            {index + 1}
          </option>
        );
      });

    const handleQuantityChange = (e: any, price: number) => {
      setSelectedQuantity(e.target.value);
      if (selectedQuantity > e.target.value) {
        cartItemPrice =
          cartItemPrice - (selectedQuantity - Number(e.target.value)) * price;
        itemPrice = itemPrice - cartItemPrice + price;
        setTotalCartValue(itemPrice);
        console.log(cartItemPrice);
      } else {
        cartItemPrice = Number(e.target.value) * price;
        // itemPrice = totalCartValue + cartItemPrice - price;
        setTotalCartValue(cartItemPrice);
        console.log(itemPrice, cartItemPrice);
      }
    };

    return (
      <HStack my="0.5rem" key={index} shadow="md" p="2rem">
        <Box mr="1rem">
          <Image
            src={item.imageURL}
            alt="product-image"
            width={100}
            height={100}
          />
        </Box>
        <VStack mx="2rem">
          <Heading as="h4" size="md">
            {item.name}
          </Heading>
          <Box>Rs {item.price}</Box>
        </VStack>
        <Box pl="3rem">
          <Select
            placeholder="Select quantity"
            onChange={(e: any) => handleQuantityChange(e, item.price)}
            cursor="pointer"
          >
            {mapOptionForItem}
          </Select>
        </Box>
      </HStack>
    );
  });

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
        {mapCartItems}
      </Box>
      {cartItems.length !== 0 && (
        <>
          <Heading size="md">Total Cart Value: </Heading>
          <Box>Rs {totalCartValue}</Box>
        </>
      )}
      {cartItems.length === 0 ? (
        <Heading size="lg">Cart is empty! Keep shopping</Heading>
      ) : null}
    </Box>
  );
};

export default cart;
