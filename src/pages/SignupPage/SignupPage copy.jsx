/** @jsxImportSource @emotion/react */
import axios from "axios";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import * as s from "./style";

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignupPage() {
        const navigate = useNavigate();
        const[username, setUsername , usernameChange] = useInput();
        const[password, setPassword , passwordChange] = useInput();
        const[checkPassword, setCheckPassword , checkPasswordChange] = useInput();
        const[name, setName , nameChange] = useInput();
        const[email, setEmail , emailChange] = useInput();

        const[messageGroup, setMessageGroup] = useState({
            username : null,
            password : null,
            checkPassword : null,
            name : null,
            email : null
        });
        const handleCheckPassword = (e) => {
            if(!!e.target.value){

                setMessageGroup(messageGroup => {
                    return {
                        ...messageGroup,
                        checkPassword:{
                            type: checkPassword === password ? "success" : "error",
                            text: checkPassword === password ? "비밀번호가 일치합니다" : "비밀번호가 서로 일치하지 않습니다"
                        }
                    }
                })
            }else{
                setMessageGroup(messageGroup=>{
                    return{
                        ...messageGroup,
                        checkPassword:null
                    }
                })
            }
        }

        const handleSignupSubmit = () =>{
            if(messageGroup.checkPassword?.type === "error"){
                alert("가입 할 회원의 정보를 다시 확인하세요 ")
                return;
            }
            if(!checkPassword){
                setMessageGroup(messageGroup => {
                    return{
                        ...messageGroup,
                        checkPassword:{
                            type:"error",
                            text:"비밀번호를 입력하세요"
                        }
                    }
                })
                return;
            }
            const signupData = {
                username,
                password,
                checkPassword,
                name,
                email
            }
            signupRequest(signupData);
        }

        const signupRequest = async (signupData) =>{
            try{
                const response = await axios.post("http://localhost:8080/auth/signup",signupData)
                if(response.data){
                    navigate("/auth/signin");
                }
            }catch(error){
              const errorMap = error.response.data;
              const entires = Object.entries(errorMap);
              let newMessageGroup = {
                username:{
                    type: "success",
                    text: "사용할 수 있는 사용자 이름 입니다"
                },
                password:{
                    type: "success",
                    text: "사용 가능한 비밀번호 입니다"
                },
                checkPassword:{
                    type: "success",
                    text: ""
                },
                name:{
                    type: "success",
                    text: "확인했습니다"
                },
                email:{
                    type: "success",
                    text: "확인했습니다"
                }
              };

              for(let [key, value] of entires){
                newMessageGroup = {
                        ...newMessageGroup,
                        [key]: {
                            type : "error",
                            text : value
                     }
                }
              }
              if(newMessageGroup.password.type === "error"){
                newMessageGroup = {
                    ...newMessageGroup,
                  checkPassword:null
                }
                setCheckPassword(() => "");
                setPassword(() => "");

              }
              setMessageGroup(() => newMessageGroup);
            }
            
        }

    return (
        <>
        <div css={s.header}>
            <h1>회원가입</h1>
            <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
        </div>
            <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={usernameChange} message={messageGroup.username}/>
            <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={messageGroup.password}/>
            <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} onBlur={handleCheckPassword} message={messageGroup.checkPassword}/>
            <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={messageGroup.name}/>
            <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={messageGroup.email}/>
            
        </>
    );
}

export default SignupPage;