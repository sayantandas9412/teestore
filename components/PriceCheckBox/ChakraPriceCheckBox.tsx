import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraPriceCheckBoxProps {
  item: number;
  handleCheckBoxClick: any;
}

const ChakraPriceCheckBox: FC<ChakraPriceCheckBoxProps> = ({
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

export default ChakraPriceCheckBox;
