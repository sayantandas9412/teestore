import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import ChakraGenderCheckBox from "./ChakraGenderCheckBox";

interface CheckBoxGenderProps {
  heading: string;
  uniqueGenderItems: string[];
  handleCheckBoxClick: any;
}

const CheckBoxGenderContainer: FC<CheckBoxGenderProps> = ({
  heading,
  uniqueGenderItems,
  handleCheckBoxClick,
}) => {
  return (
    <>
      <Heading size="sm" my="1rem" fontFamily="primary.heading">
        {heading}
      </Heading>
      {uniqueGenderItems.map((item: string, index: number) => (
        <ChakraGenderCheckBox
          key={index}
          item={item}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      ))}
    </>
  );
};
export default CheckBoxGenderContainer;
