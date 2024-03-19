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
z-index: 99;
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
 
    margin-top: 10px;
   
    
`;
export const authButtons = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 20px;
    width: 100%;
    height: 100%;
    &>button{
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        background-color: white;
        margin-bottom: 5px;
        padding: 5px;
        font-weight: 600;
        cursor: pointer;
        &:hover{
            background-color: #fafafa;
        }
        &:active{
            background-color: #eeeeee;
        }
    }
    &>button>a{
        text-decoration: none;
        color: black;
    }
    
`;

export const settings = css`
    display: flex;
    justify-content: flex-end;
    padding-right: 5px;
    &>*{
        cursor: pointer;
        padding: 5px;
    }
`;
export const profileBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const profileImg = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: white;
`;
export const usernameAndEmail = css`
display: flex;
flex-direction: column;
margin-left: 5px;
cursor: default;
&> span:nth-of-type(1){
   font-weight: 600;
}
&> span:nth-of-type(2){
    font-size: 12px;
}
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

