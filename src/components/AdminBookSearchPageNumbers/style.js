import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 5px;

`;

export const pageNumbers = css`
display: flex;
`

export const pageButton = (isSelected) => css`
display: flex;
box-sizing: border-box;
justify-content: center;
align-items: center;
margin-right:3px ;
padding: 2px 5px;
min-width: 25px;
height: 25px;
font-size: 10px;
border: ${isSelected ? "none" : "1px solid #dbdbdb"};
background-color: ${isSelected ? "#dbdbdb" : "white"};
text-decoration: none;
color: ${isSelected ? "black" : "#777777"};


`;

export const pageCount = css`
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
border: 1px solid #dbdbdb;
padding: 10px;
height: 25px;
background-color: white;
color: black;
cursor: default;

`;

export const page = css`
margin-right: 10px;
    font-size: 14px;
`;

export const count = css`
    font-size: 14px;

`;