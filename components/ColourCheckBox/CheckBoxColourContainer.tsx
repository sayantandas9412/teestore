import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import ChakraColourCheckbox from "./ChakraCheckbox";

interface CheckBoxContainerProps {
  heading: string;
  uniqueColouredItems: string[];
  handleCheckBoxClick: any;
}

const CheckBoxColourContainer: FC<CheckBoxContainerProps> = ({
  heading,
  uniqueColouredItems,
  handleCheckBoxClick,
}) => {
  return (
    <>
      <Heading size="sm" my="1rem" fontFamily="primary.heading">
        {heading}
      </Heading>
      {uniqueColouredItems.map((item: string, index: number) => (
        <ChakraColourCheckbox
          item={item}
          key={index}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      ))}
    </>
  );
};
export default CheckBoxColourContainer;
