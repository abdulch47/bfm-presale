import DropdownWrapper from "./Dropdown.style";
import { useState } from "react";

import BnbIcon from "../../assets/images/token/bnb.png";
import BusdIcon from "../../assets/images/token/busd.png";

const Dropdown = () => {
  const dropdownList = [
    {
      id: "1",
      icon: BnbIcon,
      title: "BNB",
    },
    // {
    //   id: "2",
    //   icon: BusdIcon,
    //   title: "BUSD",
    // },
  ];

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [titleText, setTitleText] = useState("BNB");
  const [selectedImg, setSelectedImg] = useState(BnbIcon);

  const dropdownHandle = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleDropdownData = (item) => {
    setTitleText(item.title);
    setSelectedImg(item.icon);
    setIsDropdownActive(false);
  };

  return (
    <DropdownWrapper onClick={dropdownHandle}>
      <button className="dropdown-toggle">
        <img src={selectedImg} alt="icon" />
        <span>{titleText}</span>
      </button>
      {isDropdownActive && (
        <ul className="dropdown-list">
          {dropdownList.map((item, i) => (
            <li key={i}>
              <a href="#" onClick={() => handleDropdownData(item)}>
                <img src={item.icon} alt="icon" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
