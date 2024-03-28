import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import BookRegisterInput from '../../../components/BookRegisterInput/BookRegisterInput';
import Select from 'react-select';
import { css } from '@emotion/react';
import { useMutation, useQuery} from 'react-query';
import { getAllBookTypeRequest, getAllCategoryRequest} from '../../../apis/api/options';
import { FiPlusSquare } from "react-icons/fi";
import { useBookReigsterInput } from '../../../hooks/useBookRegisterInput';
import { storage } from '../../../apis/firebase/config/firebaseConfig';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import RightTopButton from '../../../components/RightTopButton/RightTopButton';
import { registerBook, updateBookRequest } from '../../../apis/api/bookApi';
import AdminBookSearch from '../../../components/AdminBookSearch/AdminBookSearch';
import { useRecoilState } from 'recoil';
import { selectedBookState } from '../../../atoms/adminSelectedBookAtom';
function BookManagement(props) {

    const[bookTypeOptions, setBookTypeOptions] = useState([]);
    const[categoriesOptions, setCategoriesOptions] = useState([]);
    const[actionStatus, setActionStatus] = useState(0);  //1이면 추가 2 => 수정 3 => 삭제  0 => 선택
    const[isDelete, setDelete] = useState(false);
    const fileRef = useRef();
    const inputRefs = [
        useRef(),   //bookId
        useRef(),   //isbn
        useRef(),   //도서형식
        useRef(),   //카테고리
        useRef(),   //도서명
        useRef(),   //저자명
        useRef(),   //출판사
        useRef()    //URL
    ];
    
    const bookTypeQuery = useQuery(["bookTypeQuery"],getAllBookTypeRequest,
    {
        onSuccess: response => {
            setBookTypeOptions(() => response.data.map(bookType =>{
                return{
                    value: bookType.bookTypeId,
                    label: bookType.bookTypeName
                }
            }))
        },
        retry:0,
        refetchOnWindowFocus:false
    });

    const categoryQuery = useQuery(["categoryQuery"],getAllCategoryRequest,
    {   
        onSuccess: response => {
            setCategoriesOptions(() => response.data.map(category =>{
                return{
                    value: category.categoryId,
                    label: category.categoryName
                }
            }))
        },
        retry:0,
        refetchOnWindowFocus:false
    });

    const registerBookMutation = useMutation({
        mutationKey:"registerBookMutation",
        mutationFn: registerBook,
        onSuccess: response => {
            alert("추가 완료.");
            window.location.replace("/admin/book/management?page=1");
        }

    });

    const updateBookMutation = useMutation({
        mutationKey: "updateBookMutation",
        mutationFn: updateBookRequest,
        onSuccess: response => {
            alert("수정 완료");
            window.location.reload();

        }
    });
    const nextInput = (ref) => {     //이거 참고
        ref.current.focus();
    }
    
    const submit = () =>{
        if(actionStatus === 1){
            //저장요청      
            registerBookMutation.mutate({
                isbn: isbn.value,
                bookTypeId: bookTypeId.value.value,
                categoryId: categoryId.value.value,
                bookName: bookName.value,
                authorName:authorName.value,
                publisherName: publisherName.value,
                coverImgUrl: imgUrl.value
            });
            
        }else if(actionStatus === 2){
            updateBookMutation.mutate({
                bookId:bookId.value,
                isbn: isbn.value,
                bookTypeId: bookTypeId.value.value,
                categoryId: categoryId.value.value,
                bookName: bookName.value,
                authorName:authorName.value,
                publisherName: publisherName.value,
                coverImgUrl: imgUrl.value
            });
        }else if(actionStatus === 3){
            
            setDelete(() => true);
        }

        cancel();

        
    }
    const cancel = () => {
        bookId.setValue(() => 0);
        isbn.setValue(() => "");
        bookTypeId.setValue(() => null);
        categoryId.setValue(() => null);
        bookName.setValue(() => "");
        authorName.setValue(() => "");
        publisherName.setValue(() => "");
        imgUrl.setValue(() => "");
        setActionStatus(() => 0)
    }

    const bookId = useBookReigsterInput(nextInput,inputRefs[1]);
    const isbn = useBookReigsterInput(nextInput,inputRefs[2]);  //엔터를 누르면 nextinput 으로 가야하는데 갈떄 inputRefs[2] 으로 이동함
    const bookTypeId = useBookReigsterInput(nextInput,inputRefs[3]); 
    const categoryId = useBookReigsterInput(nextInput,inputRefs[4]); 
    const bookName = useBookReigsterInput(nextInput,inputRefs[5]);
    const authorName = useBookReigsterInput(nextInput,inputRefs[6]);
    const publisherName = useBookReigsterInput(nextInput,inputRefs[7]);
    const imgUrl = useBookReigsterInput(submit);

    const [selectedBook] = useRecoilState(selectedBookState);
    
    useEffect(() => {
        console.log(selectedBook.bookName);
        bookId.setValue(() => selectedBook.bookId);
        isbn.setValue(() => selectedBook.isbn);
        bookTypeId.setValue(() => ({value: selectedBook.bookTypeId, label:selectedBook.bookTypeName }));
        categoryId.setValue(() => ({value: selectedBook.categoryId, label:selectedBook.categoryName }));
        bookName.setValue(() => selectedBook.bookName);
        authorName.setValue(() => selectedBook.authorName);
        publisherName.setValue(() => selectedBook.publisherName);
        imgUrl.setValue(() => selectedBook.coverImgUrl);

     },[selectedBook]);
    

    const selectStyle = {
        control: (baseStyles) => 
        ({
        ...baseStyles,
        border: "none",
        borderRadius:"0px",
        outline:"none",
        boxShadow:"none"
        })
    }

    const handleFileChange = (e) => {
        const files =Array.from(e.target.files);
        
        if(files.length ===0){
            e.target.value ="";
            return;
        }
        if(!window.confirm("파일을 업로드 하시겠습니까?")){
            e.target.value ="";
            return;
        }

        const storageRef = ref(storage,`library/book/cover/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef,files[0]);

        uploadTask.on(
            "state_changed",
            snapshot =>{},
            error => {},
            () => {
                alert("업로드를 완료했습니다");
                getDownloadURL(storageRef).then(url => {
                    imgUrl.setValue(() => url);
                });
            }
        )
    }
    return (
        <div css={s.layout}>
            <div css={s.header}>
                <h1>도서관리</h1> 
                <div>
                    {
                        actionStatus === 0
                        ?
                        <>
                        <RightTopButton onClick={() => setActionStatus(1)} >추가</RightTopButton>
                        <RightTopButton onClick={() => setActionStatus(2)} >수정</RightTopButton>
                        <RightTopButton onClick={() => setActionStatus(3)} >삭제</RightTopButton>
                     
                        </>
                        :
                        <>
                        <RightTopButton onClick={submit}>확인</RightTopButton>    
                        <RightTopButton onClick={cancel}>취소</RightTopButton>    
                        </>
                    }
                </div>
                
                
            </div>
            <div css={s.topLayout}>   
                   <table css={s.registerTb}>
                       <tbody>
                            <tr>
                                <th css={s.registerTh}>도서코드</th>
                                <td>
                                    <BookRegisterInput 
                                    value={bookId.value}
                                    bookref={inputRefs[0]}
                                    onChange={bookId.handleOnChange}
                                    onKeyDown={bookId.handleOnKeyDown}
                                    isDisabled={true}/>
                                </td>
                                <th css={s.registerTh}>isbn</th>
                                <td>
                                <BookRegisterInput 
                                    value={isbn.value}
                                    bookref={inputRefs[1]}
                                    onChange={isbn.handleOnChange}
                                    onKeyDown={isbn.handleOnKeyDown}
                                    isDisabled={![1,2].includes(actionStatus)}/>
                                </td>
                                <td rowSpan={5} css={s.preview}>
                                    <div css={s.imgBox}>
                                        <img src={!imgUrl.value 
                                        ? "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
                                        :imgUrl.value
                                        } alt="" />
                                    </div>
                                    
                                </td>
                            </tr>   

                            <tr>
                                <th css={s.registerTh}>도서형식</th>
                                <td>
                                     < Select styles={ selectStyle } 
                                     options={bookTypeOptions}
                                     value={bookTypeId.value}
                                     onKeyDown={bookTypeId.handleOnKeyDown}
                                     onChange={bookTypeId.handleOnChange}
                                     ref={inputRefs[2]}
                                     isDisabled={![1,2].includes(actionStatus)}
                                     />
                                </td>

                                <th css={s.registerTh}>카테고리</th>
                                <td>
                                    < Select styles={selectStyle} 
                                    options={categoriesOptions}
                                    value={categoryId.value}
                                    onKeyDown={categoryId.handleOnKeyDown}
                                    onChange={categoryId.handleOnChange}
                                    ref={inputRefs[3]}
                                    isDisabled={![1,2].includes(actionStatus)}/>
                                </td>
                            </tr> 

                            <tr>
                                <th css={s.registerTh}>도서명</th>
                                <td colSpan={3}>
                                <BookRegisterInput 
                                    value={bookName.value}
                                    bookref={inputRefs[4]}
                                    onChange={bookName.handleOnChange}
                                    onKeyDown={bookName.handleOnKeyDown}
                                    isDisabled={![1,2].includes(actionStatus)}/>
                                </td>
                            </tr>  

                            <tr>
                                <th css={s.registerTh}>저자명</th>
                                <td>
                                <BookRegisterInput 
                                    value={authorName.value}
                                    bookref={inputRefs[5]}
                                    onChange={authorName.handleOnChange}
                                    onKeyDown={authorName.handleOnKeyDown}
                                    isDisabled={![1,2].includes(actionStatus)}/>
                                </td>
                                <th css={s.registerTh}>출판사</th>
                                <td>
                                <BookRegisterInput 
                                    value={publisherName.value}
                                    bookref={inputRefs[6]}
                                    onChange={publisherName.handleOnChange}
                                    onKeyDown={publisherName.handleOnKeyDown}
                                    isDisabled={![1,2].includes(actionStatus)}/>
                                </td>
                            </tr> 
                            <tr>
                                <th css={s.registerTh}>표지URL</th>
                                <td colSpan={3}>
                                    <div css={s.imgUrl}>

                                <span css={s.imgUrlBox}>
                                <BookRegisterInput 
                                    value={imgUrl.value}
                                    bookref={inputRefs[7]}
                                    onChange={imgUrl.handleOnChange}
                                    onKeyDown={imgUrl.handleOnKeyDown}
                                    isDisabled={![1,2].includes(actionStatus)}/>
                                </span>
                                <input type="file"
                                style={{
                                    display:"none"
                                }} 
                                onChange={handleFileChange}
                                ref={fileRef}
                                />

                                <button css={s.imgAddButton} 
                                onClick={() => fileRef.current.click()}
                                 disabled={![1,2].includes(actionStatus)}
                                 >
                                    <FiPlusSquare />
                                </button>
                                    </div>

                                </td>
                            </tr>  
                       </tbody>
                   </table>
                
            </div>
                <AdminBookSearch
             selectStyle={selectStyle}
             bookTypeOptions={bookTypeOptions}
             categoryOptions={categoriesOptions}
             isDelete={isDelete}
             setDelete={setDelete}
             />
        </div>
    );
}

export default BookManagement;