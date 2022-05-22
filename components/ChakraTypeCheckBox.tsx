import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraTypeCheckBoxProps {
  item: string;
  key: number;
  disabled?: boolean;
  setSelectedType: Dispatch<
    SetStateAction<{
      selectedType: string[];
    }>
  >;
  setDisableButton: any;
}

const ChakraTypeCheckBox: FC<ChakraTypeCheckBoxProps> = ({
  item,
  key,
  disabled,
  setSelectedType,
  setDisableButton,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedType: {
      (value: React.SetStateAction<{ selectedType: string[] }>): void;
      (arg0: (prevState: any) => { selectedType: string[] }): void;
    }
  ) => {
    if (e.target.checked === true) {
      setDisableButton(false);
      setSelectedType((prevState): any => {
        prevState.selectedType?.push(e.target.value);

        return {
          selectedType: [...new Set(prevState.selectedType)],
        };
      });
    }
    if (e.target.checked === false) {
      setSelectedType((prevState): any => {
        var index = prevState.selectedType?.indexOf(e.target.value) ?? -1;

        let modifiedArr: string[] = prevState.selectedType && [
          ...prevState.selectedType,
        ];
        if (index) {
          modifiedArr?.splice(index, 1) ?? [];
          return { selectedType: modifiedArr };
        }
        modifiedArr.splice(0);
        if (modifiedArr.length === 0) {
          return { selectedType: [] };
        }
        return { selectedType: modifiedArr };
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
      onChange={(e) => handleCheckboxChange(e, setSelectedType)}
    >
      {item}
    </Checkbox>
  );
};

export default ChakraTypeCheckBox;
