import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraColourCheckbox {
  item: string;
  key: number;
  setSelectedColours: Dispatch<
    SetStateAction<{
      selectedColours: string[];
    }>
  >;
  disabled?: boolean;
  setDisableButton: Dispatch<SetStateAction<boolean>>;
}

const ChakraColourCheckbox: FC<ChakraColourCheckbox> = ({
  key,
  item,
  setSelectedColours,
  disabled,
  setDisableButton,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedColours: {
      (value: React.SetStateAction<{ selectedColours: string[] }>): void;
      (arg0: (prevState: any) => { selectedColours: string[] }): void;
    }
  ) => {
    if (e.target.checked === true) {
      setDisableButton(false);
      setSelectedColours((prevState) => {
        prevState.selectedColours?.push(e.target.value);

        return {
          selectedColours: [...new Set(prevState.selectedColours)],
        };
      });
    }
    if (e.target.checked === false) {
      setSelectedColours((prevState) => {
        var index = prevState.selectedColours?.indexOf(e.target.value) ?? -1;

        let modifiedArr: string[] = [...prevState.selectedColours];
        if (index) {
          modifiedArr.splice(index, 1);
          return { selectedColours: modifiedArr };
        }
        modifiedArr.splice(0);
        if (modifiedArr.length === 0) {
          setDisableButton(false);
          return { selectedColours: [] };
        }
        return { selectedColours: modifiedArr };
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
      onChange={(e) => handleCheckboxChange(e, setSelectedColours)}
    >
      {item}
    </Checkbox>
  );
};

export default ChakraColourCheckbox;
