import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Sidebar = ({ markets }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Some of the neighborhood names are not consistent (e.g. "Center city" and "Center City"). This function sanitizes the neighborhood names in order to remove duplicates and prettifies them by adding spaces after slashes where appropriate so they can be mapped over and displayed. CSS takes care of re-uppercasing first letters of neighborhoods.
  const neighborhoods = new Set([
    ...markets.map((market) => {
      const lowerCaseNeighborhood = market.attributes.NEIGHBORHOOD.toLowerCase().trim();
      if (
        lowerCaseNeighborhood.includes("/") &&
        !lowerCaseNeighborhood.includes("/ ")
      ) {
        const splitNeighborhoods = lowerCaseNeighborhood.split("/");
        return splitNeighborhoods.join("/ ");
      }
      return lowerCaseNeighborhood;
    }),
  ]);

  const btnRef = React.useRef();
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Filter Markets
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter Markets</DrawerHeader>

            <DrawerBody>
              <CheckboxGroup colorScheme="green">
                <VStack
                  spacing={10}
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                >
                  <h2 className="sidebar-section-title">Neighborhoods</h2>
                  {[...neighborhoods].map((neighborhood, idx) => (
                    <Checkbox
                      value={neighborhood}
                      size="md"
                      borderColor="gray.400"
                      key={idx}
                    >
                      {neighborhood}
                    </Checkbox>
                  ))}
                  {/* <Checkbox value="naruto" size="md" borderColor="gray.400">
                    Checkbox
                  </Checkbox>
                  <Checkbox value="sasuke" size="md" borderColor="gray.400">
                    Checkbox
                  </Checkbox>
                  <Checkbox value="kakashi" size="md" borderColor="gray.400">
                    Checkbox
                  </Checkbox> */}
                  <h2 className="sidebar-section-title">Food Assistance</h2>
                  <h2 className="sidebar-section-title">Open Today</h2>
                  <Checkbox value="kakashi" size="md" borderColor="gray.400">
                    Yes
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Reset
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
