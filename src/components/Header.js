import {
  HStack,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import InfoModal from "./InfoModal";

const Header = ({ markets }) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
    option7: false,
  });

  const handleChange = (event) => {
    setSelected({
      ...selected,
      [event.target.value]: !selected[event.target.value],
    });
  };

  const handleClose = (item) => {
    setSelected({ ...selected, [item]: false });
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
        <InfoModal />
      </div>
      <div className="select-container">
        <Select
          placeholder="Select option"
          value={value}
          onChange={handleChange}
          placeholder="Neigborhoods"
        >
          <option
            value="option1"
            id={`${selected.option1 ? "selected" : ""}`}
            className="option"
          >
            Option 1
          </option>
          <option value="option2" id={`${selected.option2 ? "selected" : ""}`}>
            Option 2
          </option>
          <option value="option3" id={`${selected.option3 ? "selected" : ""}`}>
            Option 3
          </option>
        </Select>
        <Select
          placeholder="Select option"
          value={value}
          onChange={handleChange}
          placeholder="Food Assistance"
        >
          <option value="option4" id={`${selected.option4 ? "selected" : ""}`}>
            Option 4
          </option>
          <option value="option5" id={`${selected.option5 ? "selected" : ""}`}>
            Option 5
          </option>
          <option value="option6" id={`${selected.option6 ? "selected" : ""}`}>
            Option 6
          </option>
        </Select>
        <Select
          placeholder="Select option"
          value={value}
          onChange={handleChange}
          placeholder="Open Today"
        >
          <option value="option7" id={`${selected.option7 ? "selected" : ""}`}>
            Option 7
          </option>
        </Select>
      </div>
      {Object.values(selected).includes(true) && (
        <HStack className="tags">
          {Object.keys(selected).map((item) => {
            if (selected[item]) {
              return (
                <Tag variant="solid" colorScheme="teal">
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton onClick={() => handleClose(item)} />
                </Tag>
              );
            }
          })}
        </HStack>
      )}
    </header>
  );
};

export default Header;
