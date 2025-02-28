import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
    width: 100%;
    height: 35px;
    border-radius: 10px;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    
    /* 포커스 시 테두리 적용 */
    border: ${({ isFocused }) => (isFocused ? "1px solid #ab1a65" : "none")};
`;

const StyledInput = styled.input`
    width: 90%;
    height: 100%;
    border: none;
    border-radius: 10px;
    color: white;
    background: transparent;
    font: normal 10px "arial";
    outline: none;
    &:focus {
        border: none;
    }
`;

const InputField = ({ type = "text", placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
      <InputContainer isFocused={isFocused}>
          <StyledInput
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
          />
      </InputContainer>
  );
};


export default InputField;
