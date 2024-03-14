import { css } from "@emotion/react";

export const layout = (show) =>css`
position: absolute;
top: 0;
left: ${show? "0px" : "-200px"};
opacity: ${show ? 1 : 0};
transition: all 0.5s ease-in-out;
box-sizing: border-box;
border-right: 1px solid #dbdbdb;
width: 200px;
height: 100%;
background-color: #fafafa;
padding: 15px 0px;

`;

export const header =  css`
box-sizing: border-box;
width: 100%;
height: 50px;
display: flex;
justify-content: flex-end;
align-items: center;
padding: 0px 10px;
border-bottom: 1px solid #dbdbdb;

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

export const profile = css`
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 150px;

`;

export const menuList = css`

`;
export const menuLink = css`
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #eee;
    font-size: 14px;
    font-weight: 600;
    padding: 0px 20px;
    text-decoration: none;
    color: #222222;

`;
