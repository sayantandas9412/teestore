import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraPriceCheckBoxProps {
  item: number;
  key: number;
  disabled?: boolean;
  setSelectedPrice: Dispatch<
    SetStateAction<{
      selectedPrice: string[];
    }>
  >;
  setDisableButton: any;
}

const ChakraPriceCheckBox: FC<ChakraPriceCheckBoxProps> = ({
  item,
  key,
  disabled,
  setSelectedPrice,
  setDisableButton,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedPrice: {
      (value: React.SetStateAction<{ selectedPrice: string[] }>): void;
      (arg0: (prevState: any) => { selectedPrice: string[] }): void;
    }
  ) => {
    if (e.target.checked === true) {
      setDisableButton(false);
      setSelectedPrice((prevState) => {
        prevState.selectedPrice?.push(e.target.value);

        return {
          selectedPrice: [...new Set(prevState.selectedPrice)],
        };
      });
    }
    if (e.target.checked === false) {
      setSelectedPrice((prevState): any => {
        var index = prevState.selectedPrice?.indexOf(e.target.value) ?? -1;

        let modifiedArr: string[] = prevState.selectedPrice && [
          ...prevState.selectedPrice,
        ];
        if (index) {
          modifiedArr?.splice(index, 1) ?? [];
          return { selectedPrice: modifiedArr };
        }
        modifiedArr.splice(0);
        if (modifiedArr.length === 0) {
          return { selectedPrice: [] };
        }
        return { selectedPrice: modifiedArr };
      });
    }
  };
  return (
    <Checkbox
      size="md"
      colorScheme="green"
      key={key}
      value={item}
      isDisabled={disabled}
      my="0.25rem"
      onChange={(e) => handleCheckboxChange(e, setSelectedPrice)}
    >
      {item}
    </Checkbox>
  );
};

export default ChakraPriceCheckBox;
