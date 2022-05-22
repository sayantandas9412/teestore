import { Heading } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import ChakraColourCheckbox from "./ChakraCheckbox";

interface CheckBoxContainerProps {
  heading: string;
  uniqueColouredItems: string[];
  setSelectedColours: Dispatch<
    SetStateAction<{
      selectedColours: string[];
    }>
  >;
  disabled: boolean;
  setDisableButton: Dispatch<SetStateAction<boolean>>;
}

const CheckBoxColourContainer: FC<CheckBoxContainerProps> = ({
  heading,
  uniqueColouredItems,
  setSelectedColours,
  disabled,
  setDisableButton,
}) => {
  return (
    <>
      <Heading size="sm" my="1rem" fontFamily="primary.heading">
        {heading}
      </Heading>
      {uniqueColouredItems.map(
        (item: string, index: number) =>
          setSelectedColours &&
          setDisableButton && (
            <ChakraColourCheckbox
              item={item}
              key={index}
              setSelectedColours={setSelectedColours}
              disabled={disabled ?? false}
              setDisableButton={setDisableButton}
            />
          )
      )}
    </>
  );
};
export default CheckBoxColourContainer;
