/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupPage from "../SignupPage/SignupPage";
import SigninPage from "../SigninPage/SigninPage";
import OAuth2Page from "../OAuth2Page/OAuth2Page";
import OAuth2SignupPage from "../OAuth2SignupPage/OAuth2SignupPage";
import OAuth2SigninPage from "../OAuth2SigninPage/OAuth2SigninPage";

function AuthPage(props) {
    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={<SigninPage/>}/>
                <Route path='/signup' element={<SignupPage/>}/>
                <Route path='/oauth2' element={<OAuth2Page/>}/>
                <Route path='/oauth2/signin'element={<OAuth2SigninPage/>} />
                <Route path='/oauth2/merge' />
                <Route path='/oauth2/signup' element={<OAuth2SignupPage/>}/>
            </Routes>
        </div>
    );
}

export default AuthPage;