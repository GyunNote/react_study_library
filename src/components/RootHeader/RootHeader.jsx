/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
import { HiMenu } from "react-icons/hi";
import { menuState } from "../../atoms/menuAtom";
import { useRecoilState } from "recoil";

function RootHeader() {
    const[show,setShow] = useRecoilState(menuState);

    const handleOpenClick = () =>{
        setShow(() => true);
    }
    return (
        <div css={s.header}>
           <button css={s.menuButton} onClick={handleOpenClick}><HiMenu /></button> 
        </div>
    );
}

export default RootHeader;