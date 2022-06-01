import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useState } from "react";
import { Data } from "../pages";
import Quantity from "./Quantity";

export interface CartItemProps {
  item: Data;
  handleDeleteButtonClick: any;
  totalCartValue: number;
  setTotalCartValue: any;
}

const CartItem: FC<CartItemProps> = ({
  item,
  handleDeleteButtonClick,
  totalCartValue,
  setTotalCartValue,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [subtractButtonDisabled, setSubtractButtonDisabled] = useState(true);
  return (
    <HStack my="0.5rem" shadow="md" p="2rem" w="30rem">
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
        <Box fontWeight="bold">Rs {item.price}</Box>
      </VStack>
      <Box pl="3rem">
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
        />
      </Box>
      <Button
        _hover={{ bg: "#ff4500b5", color: "white" }}
        onClick={() => handleDeleteButtonClick(item.id, item.price)}
        display={quantity == 1 ? "block" : "none"}
      >
        Delete
      </Button>
    </HStack>
  );
};

export default CartItem;
