import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraGenderCheckBox {
  item: string;
  key: number;
  disabled?: boolean;
  setSelectedGender: Dispatch<
    SetStateAction<{
      selectedGender: string[];
    }>
  >;
  setDisableButton: any;
}

const ChakraGenderCheckBox: FC<ChakraGenderCheckBox> = ({
  item,
  key,
  disabled,
  setSelectedGender,
  setDisableButton,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedGender: {
      (value: React.SetStateAction<{ selectedGender: string[] }>): void;
      (arg0: (prevState: any) => { selectedGender: string[] }): void;
    }
  ) => {
    if (e.target.checked === true) {
      setDisableButton(false);
      setSelectedGender((prevState) => {
        prevState.selectedGender?.push(e.target.value);

        return {
          selectedGender: [...new Set(prevState.selectedGender)],
        };
      });
    }
    if (e.target.checked === false) {
      setSelectedGender((prevState): any => {
        var index = prevState.selectedGender?.indexOf(e.target.value) ?? -1;

        let modifiedArr: string[] = prevState.selectedGender && [
          ...prevState.selectedGender,
        ];
        if (index) {
          modifiedArr?.splice(index, 1) ?? [];
          return { setSelectedGender: modifiedArr };
        }
        modifiedArr.splice(0);
        if (modifiedArr.length === 0) {
          return { selectedGender: [] };
        }
        return { selectedGender: modifiedArr };
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
      onChange={(e) => handleCheckboxChange(e, setSelectedGender)}
    >
      {item}
    </Checkbox>
  );
};

export default ChakraGenderCheckBox;
