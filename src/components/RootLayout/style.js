import { css } from "@emotion/react";

export const background = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99;
    background-color: #666666;
    height: 100%;
    width: 100%;
`;

export const layout = css`
box-sizing: border-box;
border: 2px solid #fafafa;
border-radius: 30px;
width: 800px;
height: 600px;
background-color: black;
margin: 100px auto;
overflow: hidden;
padding: 10px;
`;