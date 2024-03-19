/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { menuState } from "../../atoms/menuAtom";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { IoSettingsOutline } from "react-icons/io5";
function RootSideMenuLeft(props) {
    const[show,setShow] = useRecoilState(menuState);
    const[isLogin , setLogin] = useState(false);
    const queryClient = useQueryClient();
    const principalQueryState = queryClient.getQueryState("principalQuery");
    
    const handleCloseClick = () =>{
        setShow(() => false);
    }

    useEffect(() => {
        setLogin(() => principalQueryState.status === "success");
    },[principalQueryState])

    return (
        <div css={s.layout(show)}>
            <div css={s.header}>
            <button css={s.menuButton} onClick={handleCloseClick}>
                <HiMenu />
            </button>
            </div>
            <div css={s.profile}>
                {
                    !isLogin
                    ?
                    <button css={s.buttonDesign}>
                        <Link to={"/auth/signin"} >로그인</Link>
                    </button>
                    :
                    <>
                        <div css={s.sideHeader}><IoSettingsOutline /></div>
                        <div css={s.profileImg}></div>
                        <div css={s.deco}>email: ________</div>
                        <div css={s.deco}>username: _________</div>
                    </>
                }
            </div>
            <div css={s.menuList}>
                <Link css={s.menuLink}>
                    도서 검색
                </Link>
            </div>
            
        </div>
    );
}

export default RootSideMenuLeft;