import React, { useContext } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SRecharge } from "./styles";

export default function Recharge() {
  const { theme } = useContext(ThemeContext);
  const onSearch = (value: any) => {
    console.log(value);
  };

  const { toggleSidebar } = useContext(ToggleSidebarContext);
  return (
    <SRecharge>
      <div className="top">
        <h3
          className="header"
          onClick={() => toggleSidebar && toggleSidebar(false)}
        >
          <FaChevronLeft color={theme.text.main} size={16} />
          Nạp tiền vào tài khoản
        </h3>
      </div>
    </SRecharge>
  );
}
