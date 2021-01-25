import {
  Button, Drawer,
  DrawerBody,




  DrawerCloseButton, DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay, useDisclosure
} from "@chakra-ui/react"
import React from 'react'

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return ( <>
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
            sdfsdfdsf
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
  </> );
}
 
export default Sidebar;