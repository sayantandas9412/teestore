import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import ChakraTypeCheckBox from "./ChakraTypeCheckBox";

interface CheckBoxTypeProps {
  heading: string;
  uniqueTypeItems: string[];
  handleCheckBoxClick: any;
}

const CheckBoxTypeContainer: FC<CheckBoxTypeProps> = ({
  heading,
  uniqueTypeItems,
  handleCheckBoxClick,
}) => {
  return (
    <>
      <Heading size="sm" my="1rem" fontFamily="primary.heading">
        {heading}
      </Heading>
      {uniqueTypeItems.map((item: string, index: number) => (
        <ChakraTypeCheckBox
          item={item}
          key={index}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      ))}
    </>
  );
};
export default CheckBoxTypeContainer;
