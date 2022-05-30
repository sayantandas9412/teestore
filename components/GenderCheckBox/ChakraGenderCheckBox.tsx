import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraGenderCheckBox {
  item: string;
  handleCheckBoxClick: any;
}

const ChakraGenderCheckBox: FC<ChakraGenderCheckBox> = ({
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

export default ChakraGenderCheckBox;
