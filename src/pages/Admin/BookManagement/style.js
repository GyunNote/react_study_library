import { css } from "@emotion/react";

export const layout = css`
box-sizing: border-box;
padding: 10px;
width: 100%;
height: 100%;
`
export const header = css`
box-sizing: border-box;
display: flex;
justify-content: space-between;

&> h1{
    margin: 0;
    margin-bottom: 20px;
    font-size: 25px;
}
`
export const topLayout = css`
display: flex;
width: 100%;
`
export const registerTb = css`
     box-sizing: border-box;
     border-collapse: collapse;
     width: 100%;
     border: 1px solid #dbdbdb;
     border-radius: 3px;
     background-color: #fdfdfd;
     & td {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        background-color: white;
     }
`
export const registerTh = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    width: 80px;
    padding: 5px;
    cursor: default;
`

export const preview = css`
    box-sizing: border-box;
    width: 150px;
    
`;

export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width:170px;
    height: 170px;
    overflow: hidden;

    &> img{
        height:100%;
    }
`;
export const imgUrl = css`
    display: flex;
    align-items: flex-end;
`;

export const imgUrlBox = css`
    display: inline-block;
    width: 95%;
    line-height: 10px;
    
`;
export const imgAddButton = css`
    display: flex;
    align-items: flex-end;
    border: none;
    background-color: transparent;
    padding: 0;
    & > * {
        font-size: 15px;
    }
    cursor: pointer;
    &:active{
        background-color: #fafafafa;
    }
`;