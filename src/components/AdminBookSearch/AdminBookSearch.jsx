/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookReigsterInput } from "../../hooks/useBookRegisterInput";
import { deleteBooksRequest, getBookCountRequest, searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";
import AdminBookSearchPageNumbers from "../AdminBookSearchPageNumbers/AdminBookSearchPageNumbers";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../atoms/adminSelectedBookAtom";

function AdminBookSearch({selectStyle ,bookTypeOptions, categoryOptions, isDelete, setDelete}) {
    // const queryClient = useQueryClient();
    // const bookTypeData = queryClient.getQueryData("bookTypeData");
    // const categoryData = queryClient.getQueryData("categoryData");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchCount = 20;
    const [bookList , setBookList] = useState([]);
    const [checkAll, setCheckAll] = useState({
        checked:false,
        target: 1           //1 이면 전체선택 2이면 부분 선택
    });
    const [selectedBook, setSelectedBook] = useRecoilState(selectedBookState);
    const [lastCheckBookId, setLastCheckBookId] = useState(0);
    const searchBooksQuery = useQuery(
        ["searchBookQuery",searchParams.get("page")],
        async() => await searchBooksRequest({
            page: searchParams.get("page"),
            count: searchCount,
            bookTypeId:selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchType: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setBookList(() => response.data.map(
                    book => {
                        return{
                            ...book,
                            checked: false
                        }
                    }
                ));
               console.log(response.data);
            }
        }
    );

    const getBookCountQuery = useQuery(
        ["getBookCountQuery",searchBooksQuery.data],
        async() => await getBookCountRequest({
            count: searchCount,
            bookTypeId:selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchType: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {
            // enabled: !!searchBooksQuery.data?.data,
            refetchOnWindowFocus: false,
            onSuccess: response => {
               console.log(response);
            }
        }
    );

    const deleteBooksMutation = useMutation({
        mutationKey:"deleteBooksMutation",
        mutationFn: deleteBooksRequest,
        onSuccess: response => {
            const deleteBooks = bookList.filter(book => book.checked).map(book => book.bookId);
            alert(`${deleteBooks.length} 건이 삭제가 완료 되었습니다.`);
            window.location.replace("/admin/book/management?page=1")
        }
    });
    
    useEffect(() => {
        if(isDelete){
            const deleteBooks = bookList.filter(book => book.checked).map(book => book.bookId);
            console.log(deleteBooks);
            deleteBooksMutation.mutate(deleteBooks);
        }
        setDelete(() => false);
    },[isDelete])

    const searchSubmit = () => {
        setSearchParams({
            page:1
        })
       searchBooksQuery.refetch();
        console.log(
            [selectedBookType.option.value,
             selectedCategory.option.value,
             selectedSearchType.option.value]
            )
        }
    const selectedBookType = useReactSelect({value: 0, label: "전체"});
    const selectedCategory  = useReactSelect({value: 0, label: "전체"});
    const selectedSearchType = useReactSelect({value: 0, label: "전체"});
    
    const searchText = useBookReigsterInput(searchSubmit);


    const searchTypeOptions = [
        {value: 0, label: "전체"},
        {value: 1, label: "도서명"},
        {value: 2, label: "저자명"},
        {value: 3, label: "출판사"},
        {value: 4, label: "ISBN"},
    ];

    const selectStyle2= {
        control: (baseStyles) => 
        ({
        ...baseStyles,
        border: "none",
        borderRadius:"0px",
        borderRight: "1px solid #dbdbdb",
        outline:"none",
        boxShadow:"none"
        })
    }
    useEffect(() => {
        if(checkAll.target === 1){

            setBookList(() =>
            bookList.map(book => {
                return {
                    ...book,
                    checked: checkAll.checked
                }
            }))
        }
    },[checkAll.checked]);

    const handleCheckAllChange = (e) => {
        setCheckAll(() =>{
            return{
                checked: e.target.checked,
                target: 1
            }
        });     
    }

    useEffect(() => {
        const findCount = bookList.filter(book => book.checked === false).length;
        if(findCount === 0){
            setCheckAll(() => {
                return{
                    checked: true,
                    target: 2
                }
            });
        }else{
            setCheckAll(() => {
                return{
                    checked: false,
                    target: 2
                }
            });
        }
    },[bookList])


    useEffect(() => {
        let lastSelectedBook = {...selectedBook}; 
        let checkStatus = false;
        lastSelectedBook = bookList.filter(book => book.bookId === lastCheckBookId && book.checked)[0];
        // for(let book of bookList){
        //     if(book.checked === true){
        //         lastSelectedBook = book;
        //         checkStatus = true
        //     }
        console.log(lastSelectedBook)
        if(!!lastSelectedBook){
            checkStatus = true;
        }
        if(!checkStatus){
            setSelectedBook(() => ({
                bookId:0,
                isbn:"",
                bookTypeId:0,
                bookTypeName:"",
                categoryId:0,
                categoryName:"",
                bookName:"",
                authorName:"",
                publisherName:"",
                coverImgUrl:""
            }));

        }else
        setSelectedBook(() => lastSelectedBook);
    },[bookList]);
   

    const handleCheckOnChange = (e) => {
        const bookId = parseInt(e.target.value);
        setBookList(() =>
            bookList.map(book =>{
                if(book.bookId === bookId){
                    return{
                        ...book,
                        checked:e.target.checked
                    }
                }
                return book;
            })
        )
        setLastCheckBookId(() => bookId);
    }
 
    return (
        <div>
            <div css={s.searchBar}>
                <Select styles={selectStyle2}
                 options={[{value: 0, label: "전체"}, ... bookTypeOptions]}
                 defaultValue={selectedBookType.defaultValue}
                 value={selectedBookType.option}
                 onChange={selectedBookType.handleOnChange}
                 />

                <Select styles={selectStyle2} 
                options={[{value: 0, label: "전체"}, ... categoryOptions]}
                defaultValue={selectedCategory.defaultValue}
                value={selectedCategory.option}
                onChange={selectedCategory.handleOnChange}
                />

                <Select  styles={selectStyle} 
                options={searchTypeOptions}
                defaultValue={selectedSearchType.defaultValue}
                value={selectedSearchType.option}
                onChange={selectedSearchType.handleOnChange}
                />


                <input type="text"
                       css={s.searchInput}
                       value={searchText.value}
                       onChange={searchText.handleOnChange}
                       onKeyDown={searchText.handleOnKeyDown}/>
                <button css={s.searchButton} onClick={() => searchSubmit()}>검색</button>
                
            </div>
            <div css={s.tableLayout}>

            <table css={s.table}>
                <thead>
                    <tr css={s.theadTr}>
                        <th><input type="checkbox" checked={checkAll.checked} onChange={handleCheckAllChange} /></th>
                        <th>코드번호</th>
                        <th>도서명</th>
                        <th>저자명</th>
                        <th>출판사명</th>
                        <th>ISBN</th>
                        <th>도서형식</th>
                        <th>카테고리</th>
                        <th>표지URL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookList.map(
                            book => 
                        <tr key={book.bookId}>
                            <td><input type="checkbox"  value={book.bookId} checked={book.checked} onChange={handleCheckOnChange} /></td>
                            <td>{book.bookId}</td>
                            <td>{book.bookName}</td>
                            <td>{book.authorName}</td>
                            <td>{book.publisherName}</td>
                            <td>{book.isbn}</td>
                            <td>{book.bookTypeName}</td>
                            <td>{book.categoryName}</td>
                            <td>{book.coverImgUrl}</td>
                        </tr>
                        )
                }
                </tbody>
            </table>
            </div>
            <div>
                {
                !getBookCountQuery.isLoading &&
                <AdminBookSearchPageNumbers bookCount={getBookCountQuery.data?.data}/>
                }
            </div>
         
        </div>
    );
}

export default AdminBookSearch;