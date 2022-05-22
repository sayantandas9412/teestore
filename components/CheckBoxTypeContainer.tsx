import { Heading } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import ChakraTypeCheckBox from "./ChakraTypeCheckBox";

interface CheckBoxTypeProps {
  heading: string;
  uniqueTypeItems: string[];
  setSelectedType: Dispatch<
    SetStateAction<{
      selectedType: string[];
    }>
  >;
  setDisableButton: any;
}

const CheckBoxTypeContainer: FC<CheckBoxTypeProps> = ({
  heading,
  uniqueTypeItems,
  setSelectedType,
  setDisableButton,
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
          setSelectedType={setSelectedType}
          setDisableButton={setDisableButton}
        />
      ))}
    </>
  );
};
export default CheckBoxTypeContainer;
