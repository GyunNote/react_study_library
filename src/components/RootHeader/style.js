import { css } from "@emotion/react";

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 10px;
    width: 100%;
    height: 50px;
`;

export const menuButton = css`
box-sizing: border-box;
padding: 10px;
border: none;
background-color: transparent;
cursor: pointer;
& > *{
    font-size: 18px;
}
`;

export const accountItems = css`
    display: flex;
    align-items: center;
    height: 100%;

`;

export const account = css`
display: flex;
justify-content: center;
align-items: center;
width: 30px;
height: 30px;

border-radius: 50%;
overflow: hidden;
text-decoration: none;
color: #222222;
margin: 0px 8px;
cursor: pointer;
`

export const logout = css`
margin: 0;
border:none;
border-radius: 50%;
overflow: hidden;
display: flex;
justify-content: center;
align-items: center;
width: 30px;
height: 30px;
background-color: transparent;
padding: 0;
cursor: pointer;
`;