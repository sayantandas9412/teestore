import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import ChakraPriceCheckBox from "./ChakraPriceCheckBox";

interface CheckBoxPriceProps {
  heading: string;
  uniquePriceItems: number[];
  handleCheckBoxClick: any;
}

const CheckBoxPriceContainer: FC<CheckBoxPriceProps> = ({
  heading,
  uniquePriceItems,
  handleCheckBoxClick,
}) => {
  return (
    <>
      <Heading size="sm" my="1rem" fontFamily="primary.heading">
        {heading}
      </Heading>
      {uniquePriceItems.map((item: number, index: number) => (
        <ChakraPriceCheckBox
          item={item}
          key={index}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      ))}
    </>
  );
};
export default CheckBoxPriceContainer;
