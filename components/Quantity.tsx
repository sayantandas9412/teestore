import { Box, Button } from "@chakra-ui/react";
import { FC } from "react";

interface QuantityProps {
  quantity: number;
  setQuantity: any;
  maxQuantity: number;
  buttonDisabled: boolean;
  setButtonDisabled: any;
}

const Quantity: FC<QuantityProps> = ({
  quantity,
  setQuantity,
  maxQuantity,
  buttonDisabled,
  setButtonDisabled,
}) => {
  const handleAddClick = () => {
    setQuantity((prevState: any) => prevState + 1);
    if (quantity >= maxQuantity - 1) {
      setButtonDisabled(true);
    }
  };

  const handleSubtractClick = () => {
    if (quantity < 1) {
      setQuantity(0);
    }
    setQuantity((prevState: any) => prevState - 1);
  };

  return (
    <Box>
      <Button disabled={buttonDisabled} onClick={handleAddClick}>
        +
      </Button>
      <div>{quantity}</div>
      <Button onClick={handleSubtractClick}>-</Button>
    </Box>
  );
};

export default Quantity;
