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
  setDisableButton?: Dispatch<SetStateAction<boolean>>;
  selectedColours: string[];
  data: any;
  setState: any;
  state: any;
  memory: any;
  setMemory: any;
}

const ChakraColourCheckbox: FC<ChakraColourCheckbox> = ({
  key,
  item,
  setSelectedColours,
  disabled,
  selectedColours,
  data,
  setState,
  state,
  memory,
  setMemory,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedColours: {
      (value: React.SetStateAction<{ selectedColours: string[] }>): void;
      (arg0: (prevState: any) => { selectedColours: string[] }): void;
    }
  ) => {
    if (e.target.checked === true) {
      setSelectedColours((prevState) => {
        prevState.selectedColours?.push(e.target.value);

        return {
          selectedColours: [...new Set(prevState.selectedColours)],
        };
      });
      const filteredColorData = data.filter((child: { color: string }) => {
        return selectedColours?.includes(child.color) ?? [];
      });
      setState(filteredColorData);
      setMemory([...filteredColorData]);
    }

    if (e.target.checked === false) {
      setSelectedColours((prevState) => {
        var index = prevState.selectedColours?.indexOf(e.target.value) ?? -1;

        let modifiedArr: string[] = prevState.selectedColours;
        if (index) {
          modifiedArr.splice(index, 1);
          return { selectedColours: modifiedArr };
        }
        modifiedArr.splice(0, 1);
        if (modifiedArr.length === 0) {
          return { selectedColours: [] };
        }

        return { selectedColours: modifiedArr };
      });

      const formattedArr = data.filter((child: { color: string }) =>
        selectedColours.includes(child.color)
      );
      setState(formattedArr);
      setMemory([...formattedArr]);
      if (selectedColours.length === 0) {
        setSelectedColours({ selectedColours: [] });
        setState(data);
      }
    }
  };

  return (
    <Checkbox
      size="md"
      colorScheme="green"
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
