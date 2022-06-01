import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChakraModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="none" backdropFilter="blur(2px)" />
        <ModalContent
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
          border="1px solid #eee"
        >
          <ModalCloseButton />
          <ModalBody mt="2rem" mb="1rem">
            <Heading size="sm">This Item is already in your cart !</Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" outline="1px solid #eee">
              <Link href="/cart">Go to cart</Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChakraModal;
