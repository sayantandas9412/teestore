import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface ChakraGenderCheckBox {
  item: string;
  key: number;

  setSelectedGender: Dispatch<
    SetStateAction<{
      selectedGender: string[];
    }>
  >;
  setState: any;
  data: any;
  selectedGender: any;
  state: any;
  selectedColour: any;
  handleCheckBoxClick: any;
}

// const intersection = (arr1: string | any[], arr2: string | any[]) => {
//   const res = [];
//   for (let i = 0; i < arr1.length; i++) {
//     if (!arr2.includes(arr1[i])) {
//       continue;
//     }
//     res.push(arr1[i]);
//   }
//   return res;
// };

// const intersectMany = (...arrs: Data[][]) => {
//   let res = arrs[0].slice();
//   for (let i = 1; i < arrs.length; i++) {
//     res = intersection(res, arrs[i]);
//   }
//   return res;
// };
const ChakraGenderCheckBox: FC<ChakraGenderCheckBox> = ({
  item,
  key,
  setSelectedGender,
  selectedGender,
  data,
  setState,
  state,
  selectedColour,
  handleCheckBoxClick,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedGender: {
      (value: React.SetStateAction<{ selectedGender: string[] }>): void;
      (arg0: (prevState: any) => { selectedGender: string[] }): void;
    }
  ) => {
    if (e.target.checked === true) {
      setSelectedGender((prevState): any => {
        prevState.selectedGender?.push(e.target.value);

        return {
          selectedGender: [...new Set(prevState.selectedGender)],
        };
      });
      const filteredGenderData = data.filter((child: { gender: string }) => {
        return selectedGender?.includes(child.gender) ?? [];
      });
      setState(filteredGenderData);
      handleCheckBoxClick(e);
    }

    if (e.target.checked === false) {
      setSelectedGender((prevState): any => {
        var index = prevState.selectedGender?.indexOf(e.target.value) ?? -1;

        let modifiedArr: string[] = prevState.selectedGender;
        if (index) {
          modifiedArr.splice(index, 1);
          return { selectedGender: modifiedArr };
        }
        modifiedArr.splice(0, 1);
        if (modifiedArr.length === 0) {
          return { selectedGender: [] };
        }

        return { selectedGender: modifiedArr };
      });

      const formattedArr = data.filter((child: { gender: string }) =>
        selectedGender.includes(child.gender)
      );
      setState(formattedArr);
      if (selectedGender.length === 0) {
        setSelectedGender({ selectedGender: [] });
        setState(data);
      }
    }
  };

  return (
    <Checkbox
      size="md"
      colorScheme="green"
      key={key}
      value={item}
      my="0.25rem"
      onChange={(e) => handleCheckboxChange(e, setSelectedGender)}
    >
      {item}
    </Checkbox>
  );
};

export default ChakraGenderCheckBox;
