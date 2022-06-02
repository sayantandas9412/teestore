import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";

interface ChakraColourCheckbox {
  item: string;
  handleCheckBoxClick: any;
}

const ChakraColourCheckbox: FC<ChakraColourCheckbox> = ({
  item,
  handleCheckBoxClick,
}) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleCheckBoxClick(e);
  };

  return (
    <Checkbox
      size="md"
      colorScheme="green"
      value={item}
      my="0.25rem"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleCheckboxChange(e)
      }
      data-element-checkbox-colour="action-color"
    >
      {item}
    </Checkbox>
  );
};

export default ChakraColourCheckbox;
