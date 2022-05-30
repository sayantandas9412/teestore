import {
  Box,
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
import Router from "next/router";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AddToCartButton from "../components/AddToCartButton";
import CheckBoxColourContainer from "../components/ColourCheckBox/CheckBoxColourContainer";
import CheckBoxGenderContainer from "../components/GenderCheckBox/CheckBoxGenderContainer";
import ChakraModal from "../components/Modal";
import CheckBoxPriceContainer from "../components/PriceCheckBox/CheckBoxPriceContainer";
import CheckBoxTypeContainer from "../components/TypeCheckBox/CheckBoxTypeContainer";

interface ProductPageProps {
  data: Data[];
  quantity?: number;
  handleAddCartClick?: any;
  disableAddCartButton: boolean;
  showModal: boolean;
  modalIsOpen: any;
  modalOnClose: any;
}

export interface Data {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
  disabled: boolean;
}

interface Filters {
  color: string[];
  price: string[];
  type: string[];
  gender: string[];
}

const Home: FC<ProductPageProps> = ({
  data,
  quantity,
  handleAddCartClick,
  disableAddCartButton,
  showModal,
  modalIsOpen,
  modalOnClose,
}) => {
  const [state, setState] = useState(data);
  const totalColouredItems = data.map((item) => item.color);
  const totalGenderItems = data.map((item) => item.gender);
  const totalPriceItems = data.map((item) => item.price);
  const totalTypeItems = data.map((item) => item.type);
  const uniqueColouredItems = [...new Set(totalColouredItems)];
  const uniqueGenderItems = [...new Set(totalGenderItems)];
  const uniquePriceItems = [...new Set(totalPriceItems)];
  const uniqueTypeItems = [...new Set(totalTypeItems)];
  const [colourData, setColour] = useState({ color: [] });
  const [genderData, setGender] = useState({ gender: [] });
  const [priceData, setPrice] = useState({ price: [] });
  const [typeData, setType] = useState({ type: [] });
  const [isSearched, setIsSearched] = useState(false);
  const [searchedItems, setSearchedItems] = useState(data);
  const [selectedColoursData, setSelectedColours] = useState<any>({
    selectedColours: [],
  });
  const [selectedGenderData, setSelectedGender] = useState<any>({
    selectedGender: [],
  });
  const [selectedPriceData, setSelectedPrice] = useState<any>({
    selectedPrice: [],
  });
  const [selectedTypeData, setSelectedType] = useState<any>({
    selectedType: [],
  });

  // useEffect(() => {
  //   const localStorageData = JSON.parse(window.localStorage.getItem("data"));
  //   setState(localStorageData);
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("data", JSON.stringify(state));
  // }, [state]);

  useEffect(() => {
    const filters: Filters = {
      ...colourData,
      ...genderData,
      ...priceData,
      ...typeData,
    };

    let resultantArr = isSearched ? searchedItems : data;
    let categories = [];
    const findState = (filters: Filters) => {
      resultantArr.forEach((value) => {
        const keys = Object.keys(value);

        categories = keys.filter((item) => {
          return item in filters;
        });
        categories.forEach((category) => {
          if (category === "gender" && filters[category].length) {
            resultantArr = resultantArr.filter((item) =>
              filters[category].includes(item.gender)
            );
          }
          if (category === "type" && filters[category].length) {
            resultantArr = resultantArr.filter((item) =>
              filters[category].includes(item.type)
            );
          }
          if (category === "price" && filters[category].length) {
            resultantArr = resultantArr.filter((item) =>
              filters[category].includes(String(item.price))
            );
          }
          if (category === "color" && filters[category].length) {
            resultantArr = resultantArr.filter((item) =>
              filters[category].includes(item.color)
            );
          }
        });
        return resultantArr;
      });
      return resultantArr;
    };

    const finalState = findState(filters);
    setState(finalState);
  }, [
    selectedColoursData.selectedColours,
    colourData.color,
    selectedGenderData.selectedGender,
    genderData.gender,
    selectedPriceData.selectedPrice,
    priceData.price,
    selectedTypeData.selectedType,
    typeData.type,
  ]);

  const handleCheckBoxClick = (e: any) => {
    // Colour changes -

    if (uniqueColouredItems.includes(e.target.value)) {
      if (e.target.checked === true) {
        setSelectedColours((prevState: any) => {
          prevState.selectedColours?.push(e.target.value);

          return {
            selectedColours: [...new Set(prevState.selectedColours)],
          };
        });

        setColour({ color: selectedColoursData.selectedColours });
      }

      if (e.target.checked === false) {
        setSelectedColours((prevState: any) => {
          var index = prevState.selectedColours?.indexOf(e.target.value) ?? -1;

          const modifiedArr: string[] = prevState.selectedColours;
          if (index) {
            modifiedArr.splice(index, 1);
            const transformedArr = [...modifiedArr];
            return { selectedColours: transformedArr };
          }
          modifiedArr.splice(0, 1);
          if (modifiedArr.length === 0) {
            return { selectedColours: [] };
          }

          return { selectedColours: modifiedArr };
        });

        if (selectedColoursData.selectedColours.length === 0) {
          setSelectedColours({ selectedColours: [] });
          // setState(data);
        }
        setColour({ color: selectedColoursData.selectedColours });
      }
    }

    // gender Changes --

    if (uniqueGenderItems.includes(e.target.value)) {
      if (e.target.checked === true) {
        setSelectedGender((prevState: any) => {
          prevState.selectedGender?.push(e.target.value);

          return {
            selectedGender: [...new Set(prevState.selectedGender)],
          };
        });
        setGender({ gender: selectedGenderData.selectedGender });
      }
      if (e.target.checked === false) {
        setSelectedGender((prevState: any) => {
          var index = prevState.selectedGender?.indexOf(e.target.value) ?? -1;

          let modifiedArr: string[] = prevState.selectedGender;
          if (index) {
            modifiedArr.splice(index, 1);
            return { selectedGender: modifiedArr };
          }
          modifiedArr.splice(0, 1);
          if (modifiedArr.length === 0) {
            return { selectedGender: [] };
          }

          return { selectedGender: modifiedArr };
        });
        setGender({ gender: selectedGenderData.selectedGender });
      }
    }

    // PRICE CHANGES  -

    if (uniquePriceItems.includes(Number(e.target.value))) {
      if (e.target.checked === true) {
        setSelectedPrice((prevState: any) => {
          prevState.selectedPrice?.push(e.target.value);

          return {
            selectedPrice: [...new Set(prevState.selectedPrice)],
          };
        });
        setPrice({ price: selectedPriceData.selectedPrice });
      }

      if (e.target.checked === false) {
        setSelectedPrice((prevState: any) => {
          var index = prevState.selectedPrice?.indexOf(e.target.value) ?? -1;

          const modifiedArr: string[] = prevState.selectedPrice;
          if (index) {
            modifiedArr.splice(index, 1);
            const transformedArr = [...modifiedArr];
            return { selectedPrice: transformedArr };
          }
          modifiedArr.splice(0, 1);
          if (modifiedArr.length === 0) {
            return { selectedPrice: [] };
          }

          return { selectedPrice: modifiedArr };
        });

        if (selectedPriceData.selectedPrice.length === 0) {
          setSelectedPrice({ selectedPrice: [] });
        }
        setPrice({ price: selectedPriceData.selectedPrice });
      }
    }

    // TYPE CHANGES -

    if (uniqueTypeItems.includes(e.target.value)) {
      if (e.target.checked === true) {
        setSelectedType((prevState: any) => {
          prevState.selectedType?.push(e.target.value);

          return {
            selectedType: [...new Set(prevState.selectedType)],
          };
        });
        setType({ type: selectedTypeData.selectedType });
      }

      if (e.target.checked === false) {
        setSelectedType((prevState: any) => {
          var index = prevState.selectedType?.indexOf(e.target.value) ?? -1;

          const modifiedArr: string[] = prevState.selectedType;
          if (index) {
            modifiedArr.splice(index, 1);
            const transformedArr = [...modifiedArr];
            return { selectedType: transformedArr };
          }
          modifiedArr.splice(0, 1);
          if (modifiedArr.length === 0) {
            return { selectedType: [] };
          }

          return { selectedType: modifiedArr };
        });

        if (selectedTypeData.selectedType.length === 0) {
          setSelectedType({ selectedType: [] });
        }
        setType({ type: selectedTypeData.selectedType });
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearched(true);
    const filteredData = state.filter(
      (child) =>
        child.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        child.type.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setState(filteredData);
    if (e.target.value === "") {
      setIsSearched(false);
      setState(data);
    }
    setSearchedItems(filteredData);
  };

  const handleAddCartButtonClick = (id: number) => {
    handleAddCartClick(id, state, setState);
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
            {item.quantity === 0 ? (
              <Box color="background.300">Sold Out !</Box>
            ) : null}
          </Heading>
          <Box>
            <Image
              alt="item-image"
              src={item.imageURL ?? "/error.jpeg"}
              width={100}
              height={100}
            />
          </Box>
          <Box position="absolute" bottom="1rem" left="1rem" fontWeight="bold">
            {`Rs ${item.price}`}
          </Box>
          <AddToCartButton
            title="Add to cart"
            maxQuantity={item.quantity}
            handleAddCartButtonClick={handleAddCartButtonClick}
            disableAddCartButton={item.disabled}
            id={item.id}
          />
        </Box>
      </Box>
    );
  });
  return (
    <HStack alignItems="center" justifyContent="center" pos="relative">
      <VStack>
        <FormControl w="60%" mt="2rem" display="flex" position="relative">
          <FormLabel htmlFor="input" />
          <Input
            id="input"
            type="text"
            placeholder="search your product here"
            fontFamily={"primary.heading"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
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
            alignItems="center"
            w={["20%", "67%", "75%", "82%"]}
          >
            {mapCards}
          </Box>
          {showModal && (
            <ChakraModal isOpen={modalIsOpen} onClose={modalOnClose} />
          )}

          {state.length === 0 ? (
            <Heading alignContent="center">
              Oops ! No Item matches the selected filter
            </Heading>
          ) : null}
        </Stack>
      </VStack>
      <Flex
        p="2rem"
        flexDirection="column"
        pos="absolute"
        right="3rem"
        top="10.7rem"
        shadow="md"
      >
        <CheckBoxColourContainer
          heading="Colour"
          uniqueColouredItems={uniqueColouredItems}
          handleCheckBoxClick={handleCheckBoxClick}
        />
        <CheckBoxGenderContainer
          heading="Gender"
          uniqueGenderItems={uniqueGenderItems}
          handleCheckBoxClick={handleCheckBoxClick}
        />
        <CheckBoxPriceContainer
          heading="Price"
          uniquePriceItems={uniquePriceItems}
          handleCheckBoxClick={handleCheckBoxClick}
        />
        <CheckBoxTypeContainer
          heading="Type"
          uniqueTypeItems={uniqueTypeItems}
          handleCheckBoxClick={handleCheckBoxClick}
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
