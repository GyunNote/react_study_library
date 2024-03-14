/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';

function RootLayout({children}) {
    return (
       <>
          <div css={s.background}></div>
          <div css={s.layout}>
                {children}
          </div>
       </>
    );
}

export default RootLayout;