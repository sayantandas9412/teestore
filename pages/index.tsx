import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ChakraCheckbox from "../components/ChakraCheckbox";
import CheckBoxColourContainer from "../components/CheckBoxColourContainer";
import CheckBoxContainer from "../components/CheckBoxColourContainer";
import CheckBoxGenderContainer from "../components/CheckBoxGenderContainer";
import CheckBoxPriceContainer from "../components/CheckBoxPriceContainer";

interface ProductPageProps {
  data: Data[];
}

interface Data {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
}

const Home: FC<ProductPageProps> = ({ data }) => {
  const [state, setState] = useState(data);
  const totalColouredItems = data.map((item) => item.color);
  const totalGenderItems = data.map((item) => item.gender);
  const totalPriceItems = data.map((item) => item.price);
  const uniqueColouredItems = [...new Set(totalColouredItems)];
  const uniqueGenderItems = [...new Set(totalGenderItems)];
  const uniquePriceItems = [...new Set(totalPriceItems)];
  const [disabled, setDisabled] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [checked, setChecked] = useState(false);
  const [selectedColoursData, setSelectedColours] = useState<any>({
    selectedColours: [],
  });
  const [selectedGenderData, setSelectedGender] = useState<any>({
    selectedGender: [],
  });
  const [selectedPriceData, setSelectedPrice] = useState<any>({
    selectedPrice: [],
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredData = data.filter(
      (child) =>
        child.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        child.type.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setState(filteredData);
  };

  const handleCheckboxSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChecked(false);
    setDisableButton(true);
    setDisabled(true);
    const filteredColorData = data.filter((child) => {
      return selectedColoursData.selectedColours?.includes(child.color) ?? [];
    });

    const filteredGenderData = data.filter((child) => {
      return selectedGenderData.selectedGender?.includes(child.gender) ?? [];
    });

    const filteredPriceData = data.filter((child) => {
      return (
        selectedPriceData.selectedPrice?.includes(String(child.price)) ?? []
      );
    });
    if (filteredColorData.length && filteredGenderData.length) {
      const resultantArray = filteredGenderData.filter((x) =>
        filteredColorData.includes(x)
      );
      setState(resultantArray);
      return;
    }

    if (filteredColorData.length) {
      setState(filteredColorData);
      return;
    }
    if (filteredGenderData.length) {
      setState(filteredGenderData);
      return;
    }

    if (filteredPriceData.length) {
      setState(filteredPriceData);
      return;
    }

    // if (selectedColoursData.selectedColours.length === 0) {
    //   setState(data);
    //   // setDisableButton(true);
    // }
  };
  const handleFormClear = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setChecked(false);
    setDisabled(false);
    setSelectedColours({
      selectedColours: selectedColoursData.selectedColours,
    });
    setSelectedGender({
      selectedGender: selectedGenderData.selectedGender,
    });
    setSelectedPrice({
      selectedPrice: selectedPriceData.selectedPrice,
    });
    setState(data);
  };

  const mapCards = state.map((item, index) => {
    return (
      <Box key={index}>
        <Box
          p="1.5rem"
          shadow="lg"
          w="250px"
          h="200px"
          display="flex"
          my="2rem"
          mx="1rem"
          position="relative"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            size="xs"
            fontFamily="primary.heading"
            zIndex={100}
            position="absolute"
            top="1rem"
            left="1rem"
          >
            {item.name}
          </Heading>
          <Box>
            <Image
              alt="item-image"
              src={item.imageURL}
              width={100}
              height={100}
            />
          </Box>
          <Box position="absolute" bottom="1rem" left="1rem" fontWeight="bold">
            {`Rs ${item.price}`}
          </Box>
          <Button
            outline={"2px solid"}
            outlineColor="background.200"
            variant="secondary"
            position="absolute"
            bottom="0.5rem"
            right="0.5rem"
            _hover={{ background: "#1515c5a8", color: "white" }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    );
  });
  return (
    <HStack alignItems="start" pos="relative">
      <VStack>
        <FormControl w="60%" mt="2rem" display="flex" position="relative">
          <FormLabel htmlFor="input" />
          <Input
            id="input"
            type="text"
            placeholder="search your product here"
            fontFamily={"primary.heading"}
            onChange={(e) => handleInputChange(e)}
          />
          <Icon
            as={AiOutlineSearch}
            position="absolute"
            right="1rem"
            top="0.75rem"
          />
        </FormControl>
        <Stack>
          <Box
            display="flex"
            flexWrap={"wrap"}
            py="4rem"
            justifyContent="start"
            w="87%"
          >
            {mapCards}
          </Box>
        </Stack>
      </VStack>
      <Flex
        p="2rem"
        flexDirection="column"
        pos="absolute"
        right="1rem"
        top="10.7rem"
        shadow="md"
      >
        <Flex>
          <Button
            variant="secondary"
            value="apply"
            type="submit"
            onClick={(e) => handleCheckboxSubmit(e)}
            mb="1rem"
            outline={"2px solid"}
            outlineColor="background.200"
            disabled={disableButton}
          >
            Apply
          </Button>
          <Button
            variant="secondary"
            value="apply"
            type="submit"
            onClick={(e) => handleFormClear(e)}
            mb="1rem"
            outline={"2px solid"}
            outlineColor="background.200"
            ml="1rem"
          >
            Reset
          </Button>
        </Flex>
        <CheckBoxColourContainer
          heading="Colour"
          uniqueColouredItems={uniqueColouredItems}
          disabled={disabled}
          setSelectedColours={setSelectedColours}
          setDisableButton={setDisableButton}
        />
        <CheckBoxGenderContainer
          heading="Gender"
          uniqueGenderItems={uniqueGenderItems}
          setSelectedGender={setSelectedGender}
          setDisableButton={setDisableButton}
        />
        <CheckBoxPriceContainer
          heading="Price"
          uniquePriceItems={uniquePriceItems}
          setSelectedPrice={setSelectedPrice}
          setDisableButton={setDisableButton}
        />
      </Flex>
    </HStack>
  );
};

export const getStaticProps = async () => {
  const fetchData = async (api: string) => {
    console.log("fetch data is called");
    const data = await fetch(api);
    return await data.json();
  };

  const fetchedData = await fetchData(
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
  );
  return {
    props: { data: fetchedData },
  };
};
export default Home;
