import { Heading } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import ChakraGenderCheckBox from "./ChakraGenderCheckBox";

interface CheckBoxGenderProps {
  heading: string;
  uniqueGenderItems: string[];
  setSelectedGender: Dispatch<
    SetStateAction<{
      selectedGender: string[];
    }>
  >;
  selectedGender: any;
  setState: any;
  data: any;
  state: any;
  selectedColour: any;
  handleCheckBoxClick: any;
}

const CheckBoxGenderContainer: FC<CheckBoxGenderProps> = ({
  heading,
  uniqueGenderItems,
  setSelectedGender,
  selectedGender,
  data,
  setState,
  state,
  selectedColour,
  handleCheckBoxClick,
}) => {
  return (
    <>
      <Heading size="sm" my="1rem" fontFamily="primary.heading">
        {heading}
      </Heading>
      {uniqueGenderItems.map((item: string, index: number) => (
        <ChakraGenderCheckBox
          item={item}
          key={index}
          setSelectedGender={setSelectedGender}
          selectedGender={selectedGender}
          data={data}
          setState={setState}
          state={state}
          selectedColour={selectedColour}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      ))}
    </>
  );
};
export default CheckBoxGenderContainer;
