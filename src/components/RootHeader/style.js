import { css } from "@emotion/react";

export const header = css`
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    margin-top: 15px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
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
