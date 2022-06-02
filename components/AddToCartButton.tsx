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
      bottom="14px"
      right="0.5rem"
      fontSize="smaller"
      w={["82px", "100px"]}
      h={["25px", "35px"]}
      _hover={{ background: "#1515c5a8", color: "white" }}
      _focus={{ background: "#1515c5a8", color: "white" }}
      onClick={() => handleAddCartButtonClick(id)}
      disabled={maxQuantity === 0 || disableAddCartButton}
    >
      {title}
    </Button>
  ) : (
    <Button
      position="absolute"
      bottom="14px"
      right="0.5rem"
      fontSize="smaller"
      w={["82px", "100px"]}
      h={["25px", "35px"]}
      background={["#eee", "background.300"]}
      _focus={{ border: "none" }}
      _hover={{ background: "#eee", color: "black" }}
      color={["black", "white"]}
    >
      <Link href="/cart">Go to cart</Link>
    </Button>
  );
};

export default AddToCartButton;
