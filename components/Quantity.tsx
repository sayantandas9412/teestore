import { Box, Button } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Data } from "../pages";

interface QuantityProps {
  quantity: number;
  setQuantity: any;
  maxQuantity: number;
  addButtonDisabled: boolean;
  setAddButtonDisabled: any;
  subtractButtonDisabled: boolean;
  setSubtractButtonDisabled: any;
  totalCartValue: number;
  setTotalCartValue: any;
  price: number;
  cartState: Data[];
  id: number;
  setCartState: any;
  orderedQuantity: number;
}

const Quantity: FC<QuantityProps> = ({
  quantity,
  setQuantity,
  maxQuantity,
  addButtonDisabled,
  setAddButtonDisabled,
  subtractButtonDisabled,
  setSubtractButtonDisabled,
  setTotalCartValue,
  price,
  cartState,
  id,
  setCartState,
  orderedQuantity,
}) => {
  useEffect(() => {
    if (orderedQuantity < maxQuantity) {
      setAddButtonDisabled(false);
      setSubtractButtonDisabled(false);
    }
    if (orderedQuantity === 1) {
      setSubtractButtonDisabled(true);
    }
    if (orderedQuantity === maxQuantity) {
      setSubtractButtonDisabled(false);
      setAddButtonDisabled(true);
    }
    if (maxQuantity === 1) {
      setSubtractButtonDisabled(true);
    }
  }, [orderedQuantity]);

  const handleAddClick = () => {
    setSubtractButtonDisabled(false);
    setQuantity((prevState: number) => prevState + 1);
    setTotalCartValue((prevState: number) => prevState + price);
    if (quantity >= maxQuantity - 1) {
      setAddButtonDisabled(true);
      setSubtractButtonDisabled(false);
    }

    const result = cartState.map((data: Data) => {
      if (data.id === id) {
        return { ...data, orderedQuantity: quantity + 1 };
      } else return data;
    });
    setCartState({ data: result });
  };

  const handleSubtractClick = () => {
    setAddButtonDisabled(false);
    setTotalCartValue((prevState: number) => prevState - price);
    if (quantity <= 1) {
      setQuantity(1);
      setSubtractButtonDisabled(true);
    } else setQuantity((prevState: number) => prevState - 1);
    const result = cartState.map((data: Data) => {
      if (data.id === id) {
        return { ...data, orderedQuantity: orderedQuantity - 1 };
      } else return data;
    });
    setCartState({ data: result });
  };

  return (
    <Box>
      <Button
        disabled={addButtonDisabled}
        onClick={handleAddClick}
        data-test-element="action-add-quantity"
      >
        +
      </Button>
      <Box textAlign="center" fontWeight="bold">
        {orderedQuantity}
      </Box>
      <Button
        onClick={handleSubtractClick}
        disabled={subtractButtonDisabled}
        data-test-element="action-subtract-quantity"
      >
        -
      </Button>
    </Box>
  );
};

export default Quantity;
