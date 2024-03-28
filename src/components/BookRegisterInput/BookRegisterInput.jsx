import React, { useState } from 'react';
import { input } from '../AuthPageInput/style';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const inputBox = css`
box-sizing: border-box;
  border: none;
  outline: none;
  padding: 0px 10px;
  height: 100%;
  width: 100%;
  
  &:disabled{
    background-color: white-space;
  }
`;

function BookRegisterInput({value, onChange, onKeyDown, bookref, isDisabled}) {
 
    return (
        <input 
        css={inputBox}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={bookref}
        disabled={isDisabled}
         />
    );
}

export default BookRegisterInput;