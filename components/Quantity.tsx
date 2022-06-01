import { Box, Button } from "@chakra-ui/react";
import { FC, useEffect } from "react";

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
}) => {
  useEffect(() => {
    if (quantity <= 1) {
      setSubtractButtonDisabled(true);
    }
  }, [quantity, setSubtractButtonDisabled]);

  const handleAddClick = () => {
    setSubtractButtonDisabled(false);
    setQuantity((prevState: any) => prevState + 1);
    setTotalCartValue((prevState: any) => prevState + price);
    if (quantity >= maxQuantity - 1) {
      setAddButtonDisabled(true);
      setSubtractButtonDisabled(false);
    }
  };

  const handleSubtractClick = () => {
    setAddButtonDisabled(false);
    setTotalCartValue((prevState: any) => prevState - price);
    if (quantity <= 1) {
      setQuantity(1);
      setSubtractButtonDisabled(true);
    } else setQuantity((prevState: any) => prevState - 1);
  };

  return (
    <Box>
      <Button disabled={addButtonDisabled} onClick={handleAddClick}>
        +
      </Button>
      <Box textAlign="center" fontWeight="bold">
        {quantity}
      </Box>
      <Button onClick={handleSubtractClick} disabled={subtractButtonDisabled}>
        -
      </Button>
    </Box>
  );
};

export default Quantity;
