import { css } from "@emotion/react";

export const button = css`
    transition: all 0.3s ease-in-out;
    border: none;
    background-color: transparent;
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    color: #19a3ff;
    &:hover{
        text-shadow: 0px 0px 10px  #19a3ff55;
    }
`;