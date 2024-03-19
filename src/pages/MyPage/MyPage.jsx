import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQueryClient } from 'react-query';

function MyPage() {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery")
    return (
        <div css={s.layout}>
            <div css={s.header}>
                <div css={s.imgBox}>
                    <div css={s.profileImg}>
                    <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTZfMzkg/MDAxNTg5NTk1MDQ3NTQy.g0CJOJuDk2YaW9Tb-mSRyqn3mQZBSGfe_7eYECRA6cUg.sVY8tZ4JXGVw-1CJacsOAhGby7NM6anVj0BQ3AFKsdwg.GIF.hyovelys/FD485966-33E4-4148-8FE1-62F8620ED8EA.gif?type=w800" alt="" />
                    </div>
                </div>

                <div css={s.infoBox}>
                    <div css={s.infoText}>사용자이름 : {principalData.data.username}</div>
                    <div css={s.infoText}>이름: {principalData.data.name}</div>
                    <div css={s.emailBox}>
                        <div css={s.infoText}>이메일: {principalData.data.email}</div>
                        {
                            principalData.data.authorities
                            .filter(auth => auth.authority === "ROLE_USER").length === 0 ?
                            <button css={s.infoButton}>인증하기</button>
                            :
                            <>체크</>
                        }
                    </div>
                    <div>
                        <button>정보 수정</button>
                        <button>비밀번호 수정</button>
                    </div>
                </div>
            </div>
            <div css={s.bottom}>

            </div>
        </div>
    );
}

export default MyPage;