/** @jsxImportSource @emotion/react */
import { Link, useSearchParams } from "react-router-dom";
import * as s from "./style";

import React, { useEffect, useState } from 'react';

function AdminBookSearchPageNumbers({bookCount}) {
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page"));
    const [numbers,setNumbers] = useState([]);
    const maxPageNumber = bookCount.maxPageNumber;
    const startPageNumber = page % 10 === 0 ? page -9 : (page - (page % 10)) + 1;
    
    useEffect(() => {
        const endPageNumber = startPageNumber + 9 > maxPageNumber ? maxPageNumber : startPageNumber + 9;
        
        let pageNumbers = [];

        for(let i = startPageNumber;i<= endPageNumber;i++){
           pageNumbers = [...pageNumbers, i];
        }
        setNumbers(() => pageNumbers);
      

    },[page,bookCount])
    return (
        <div css={s.layout}>
            <div css={s.pageNumbers}>
                {
                    page !== 1 &&
                <Link css={s.pageButton(false)} 
                to={`/admin/book/management?page=1`}>처음으로</Link>
                }

                {
                    page !== 1 &&
                    page> 10 
                    ? 
                    <Link css={s.pageButton(false)}
                    to={`/admin/book/management?page=${startPageNumber - 10}`}>&#171;</Link>
                    :
                    page !== 1 &&
                    <Link css={s.pageButton(false)} 
                    to={`/admin/book/management?page=1`}>&#171;</Link>
                }

                {
                    page !== 1 &&
                    <Link css={s.pageButton(false)} 
                    to={`/admin/book/management?page=${page -1}`}>&#60;</Link>
                }

                {
                    numbers.map(number =>
                        <Link key={number} css={s.pageButton(number === page)} to={`/admin/book/management?page=${number}`}>{number}</Link>)
                }

                {
                    page !== maxPageNumber &&
                <Link css={s.pageButton(false)} to={`/admin/book/management?page=${page +1}`}>&#62;</Link>
                }

                {
                    page !== maxPageNumber &&
                    page < maxPageNumber -10 
                    ?
                    <Link css={s.pageButton(false)}
                    to={`/admin/book/management?page=${startPageNumber + 10}`}>&#187;</Link>
                    :
                    page !== maxPageNumber &&
                    <Link css={s.pageButton(false)}
                    to={`/admin/book/management?page=${maxPageNumber}`}>&#187;</Link>
                }
                {
                    page !== maxPageNumber &&
                <Link css={s.pageButton(false)}
                 to={`/admin/book/management?page=${maxPageNumber}`}>마지막으로</Link>
                }
            </div>
            <div css={s.pageCount}>
                <div css={s.page}>Page: {page} of {maxPageNumber}</div>
                <div css={s.count}>Count: {bookCount.totalCount}</div>

            </div>
            
        </div>
    );
}

export default AdminBookSearchPageNumbers;