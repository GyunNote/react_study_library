/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { menuState } from "../../atoms/menuAtom";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { IoMdSettings } from "react-icons/io";
import { FiUser } from "react-icons/fi";

function RootSideMenuLeft(props) {
    const[show,setShow] = useRecoilState(menuState);
    const[isLogin, setLogin] = useState(false);
    const queryClient = useQueryClient();
    const principalQueryState = queryClient.getQueryState("principalQuery");
    const navigate = useNavigate();
    useEffect(() => {
        setLogin(() => principalQueryState.status === "success")
    },[principalQueryState])
    

    const handleCloseClick = () =>{
        setShow(() => false);
    }
   
    return (
        <div css={s.layout(show)} onClick={(e) => e.stopPropagation()}>
            <div css={s.header}>
            <button css={s.menuButton} onClick={handleCloseClick}>
                <HiMenu />
            </button>
            </div>
            <div css={s.profile}>
                { !isLogin ?
                <div css={s.authButtons}>
                    <button onClick={() => navigate("/auth/signin")}>로그인</button>
                    <button onClick={() => navigate("/auth/signup")}>회원가입</button>
                </div>
                :
                <>
                    <div css={s.settings}>
                     <IoMdSettings />
                    </div>

                    <div css={s.profileBox}>
                        <div css={s.profileImg}>
                            <FiUser />
                        </div>
                    <div css={s.usernameAndEmail}> 
                        <span >{principalQueryState.data.data.username}</span>
                        <span>{principalQueryState.data.data.email}</span>
                    </div>
                    </div>

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