import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface AddToCartButtonProps {
  title: string;
  maxQuantity: number;
  handleAddCartButtonClick: any;
  disableAddCartButton: boolean;
  id: number;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
  title,
  maxQuantity,
  handleAddCartButtonClick,
  disableAddCartButton,
  id,
}) => {
  return !disableAddCartButton ? (
    <Button
      outline={"2px solid"}
      outlineColor="background.200"
      variant="secondary"
      position="absolute"
      bottom="0.5rem"
      right="0.5rem"
      _hover={{ background: "#1515c5a8", color: "white" }}
      onClick={() => handleAddCartButtonClick(id)}
      disabled={maxQuantity === 0 || disableAddCartButton}
    >
      {title}
    </Button>
  ) : (
    <Button
      position="absolute"
      bottom="0.5rem"
      right="0.5rem"
      background={"background.300"}
      _focus={{ border: "none" }}
      _hover={{ background: "#eee", color: "black" }}
      color="white"
    >
      <Link href="/cart">Go to cart</Link>
    </Button>
  );
};

export default AddToCartButton;
