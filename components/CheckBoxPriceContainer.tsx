import { Heading } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import ChakraGenderCheckBox from "./ChakraGenderCheckBox";
import ChakraPriceCheckBox from "./ChakraPriceCheckBox";

interface CheckBoxPriceProps {
  heading: string;
  uniquePriceItems: number[];
  setSelectedPrice: Dispatch<
    SetStateAction<{
      selectedPrice: string[];
    }>
  >;
  setDisableButton: any;
}

const CheckBoxPriceContainer: FC<CheckBoxPriceProps> = ({
  heading,
  uniquePriceItems,
  setSelectedPrice,
  setDisableButton,
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
          setSelectedPrice={setSelectedPrice}
          setDisableButton={setDisableButton}
        />
      ))}
    </>
  );
};
export default CheckBoxPriceContainer;
