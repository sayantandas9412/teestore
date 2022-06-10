import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useState } from "react";
import { Data } from "../pages";
import Quantity from "./Quantity";

export interface CartItemProps {
  item: Data;
  totalCartValue: number;
  setTotalCartValue: any;
  cartState: any;
  setCartState: any;
  orderedQuantity: number;
}

const CartItem: FC<CartItemProps> = ({
  item,
  totalCartValue,
  setTotalCartValue,
  cartState,
  setCartState,
  orderedQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [subtractButtonDisabled, setSubtractButtonDisabled] = useState(true);
  const handleDeleteButtonClick = (id: number, price: number) => {
    const filteredCartItems = cartState.filter(
      (child: any) => Number(child.id) !== Number(id)
    );

    if (item.quantity === orderedQuantity) {
      setSubtractButtonDisabled(false);
    }

    if (orderedQuantity < item.quantity) {
      setAddButtonDisabled(false);
    }

    setCartState({ data: filteredCartItems });
    setQuantity(orderedQuantity - 1);
    setTotalCartValue((prevState: number) => prevState - price);
  };
  return (
    <HStack
      my="0.5rem"
      shadow="md"
      p={["1rem", "2rem"]}
      w={["22rem", "30rem"]}
      data-test-element="cart-item"
    >
      <Box mr="1rem" w={[50, 50]}>
        <Image
          src={item.imageURL}
          alt="product-image"
          width={100}
          height={100}
        />
      </Box>
      <VStack
        mx={["0", "2rem"]}
        alignItems="flex-start"
        fontSize={["sm", "md"]}
        w={["5rem", ""]}
      >
        <Heading as="h4" fontSize={["sm", "md", "larger"]}>
          {item.name}
        </Heading>
        <Box fontWeight="bold">Rs {item.price}</Box>
      </VStack>
      <Box pl={["0.25rem", "3rem"]}>
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          maxQuantity={item.quantity}
          addButtonDisabled={addButtonDisabled}
          setAddButtonDisabled={setAddButtonDisabled}
          subtractButtonDisabled={subtractButtonDisabled}
          setSubtractButtonDisabled={setSubtractButtonDisabled}
          totalCartValue={totalCartValue}
          setTotalCartValue={setTotalCartValue}
          price={item.price}
          id={item.id}
          cartState={cartState}
          setCartState={setCartState}
          orderedQuantity={orderedQuantity}
        />
      </Box>
      <Button
        _hover={{ bg: "#ff4500b5", color: "white" }}
        onClick={() => handleDeleteButtonClick(item.id, item.price)}
        display={
          (orderedQuantity == 1 && orderedQuantity !== item.quantity) ||
          item.quantity === 1
            ? "block"
            : "none"
        }
        fontSize={["smaller", "inherit"]}
        width={["auto", "6rem"]}
        data-test-element="action-delete-item"
      >
        Delete
      </Button>
    </HStack>
  );
};

export default CartItem;
