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
  setDisableButton: any;
}

const CheckBoxGenderContainer: FC<CheckBoxGenderProps> = ({
  heading,
  uniqueGenderItems,
  setSelectedGender,
  setDisableButton,
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
          setDisableButton={setDisableButton}
        />
      ))}
    </>
  );
};
export default CheckBoxGenderContainer;
