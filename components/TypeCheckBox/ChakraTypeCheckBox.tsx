import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";

interface ChakraTypeCheckBoxProps {
  item: string;
  handleCheckBoxClick: any;
}

const ChakraTypeCheckBox: FC<ChakraTypeCheckBoxProps> = ({
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
    >
      {item}
    </Checkbox>
  );
};

export default ChakraTypeCheckBox;
