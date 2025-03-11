import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from '../components/Spinner'; // 스피너 컴포넌트 임포트
import AdminContext from "../AdminContext";

const Container = styled.div`
    width: 70%;
    height: auto;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    padding: 20px 30px;
    margin: 100px auto 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 765px) {
        padding: 20px 10px;
        width: 90%;
    }
`;

const Label = styled.p`
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    background: transparent;
    text-align: center;
    width: auto;
    padding: 0;
    margin:  5px 0;
`;

const Content = styled.textarea`
    width: calc(90%);
    height: auto;
    font-size: 16px;
    color: #ddd;
    line-height: 1.6;
    white-space: pre-wrap;
    background: transparent;
    border: ${(props) => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
    border-radius: 5px;
    padding: 10px;
    outline: none; /* 기본 클릭 시 테두리 제거 */
    margin-top: 20px;
    resize: none;
    overflow: hidden;
`;

const Input = styled.input`
    font-size: 16px;
    color: #ddd;
    background: transparent;
    border: 1px solid transparent;
    padding: 10px;
    outline: none; /* 기본 클릭 시 테두리 제거 */

    &.title {
        font: bold 20px 'arial';
        margin-bottom: 20px;
        color: white;
        text-align: center;
        width: auto;
        border: none; /* 기본적으로 border를 제거 */
        border-bottom: ${(props) => (props.editable ? "1px solid #ab1a65" : "none")}; /* 수정 모드에서만 border-bottom */
    }

    &.info {
        margin: 0;
        padding: 0 10px;
        width: auto;
        min-width: 50px;
        max-width: 100px;
    }
`;


const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    background: transparent;
`;

const Button = styled.button`
    padding: 5px 15px;
    border: none;
    border-radius: 5px;
    font: bold 13px 'arial';
    cursor: pointer;
    color: white;
    background: ${(props) => (props.danger ? "#ab1a65" : "#4CAF50")};
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: ${(props) => (props.danger ? "#e0004d" : "#45a049")};
    }

    &:active {
        background: ${(props) => (props.danger ? "#8b0037" : "#3d8b40")};
    }
`;

const SubWrapper = styled.div`
    background: transparent;   
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    align-self: flex-end;
`

const NotiContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const localUserId = localStorage.getItem("userId");
    const [userid, setUserid] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    const {isAdmin} = useContext(AdminContext);

    const textareaRef = useRef(null);
    
    useEffect(() => {
        if (!id) {
            setError("ID가 없습니다.");
            return;
        }
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                    withCredentials: true,
                });
                setContent(response.data);
                setUserid(response.data.memberId);
                setEditedTitle(response.data.title);
                setEditedContent(response.data.content);
            } catch (err) {
                console.error("데이터 로드 오류:", err);
                setError("데이터를 가져오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setIsLoading(true); // 삭제 작업 중 로딩 표시
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                    withCredentials: true,
                });
                console.log("삭제 성공:", response);
                alert("게시글이 삭제되었습니다.");
                navigate("/community");
            } catch (err) {
                console.error("삭제 요청 오류:", err);
                alert("게시글 삭제에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleEdit = async () => {
        if (window.confirm("수정 내용을 저장하시겠습니까?")) {
            setIsLoading(true); // 수정 작업 중 로딩 표시
            try {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                    title: editedTitle,
                    content: editedContent,
                }, {
                    withCredentials: true,
                });
                console.log("수정 성공:", response);
                alert("게시글이 수정되었습니다.");
                setIsEditing(false);
                setContent((prev) => ({
                    ...prev,
                    title: editedTitle,
                    content: editedContent,
                }));
                navigate("/community");
            } catch (err) {
                console.error("수정 요청 오류:", err);
                alert("게시글 수정에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    },[editedContent]);

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    if (isLoading) return <Spinner text="로딩 중..." />; // 스피너 표시

    if (error) return <Container><p>{error}</p></Container>;

    return (
            <Container>
                {content ? (
                    <>
                        <Input
                            editable={isEditing}
                            readOnly={!isEditing}
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="title"
                        />
                        <SubWrapper>
                            <Label>작성자</Label>
                            <Input
                                readOnly
                                value={content.nickName}
                                className="info"
                            />
                        </SubWrapper>
                        <SubWrapper>
                            <Label>작성일</Label>
                            <Input
                                readOnly
                                value={content.createDate.slice(0, 10)}
                                className="info"
                            />
                        </SubWrapper>
                        <Content
                            editable={isEditing}
                            readOnly={!isEditing}
                            value={editedContent}
                            onChange={handleContentChange}
                            ref = {textareaRef}
                        />
                        {(userid === Number(localUserId) || isAdmin)  && (
                            <ButtonWrapper>
                                {isEditing ? (
                                    <Button onClick={handleEdit}>저장</Button>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)}>수정</Button>
                                )}
                                <Button danger onClick={handleDelete}>삭제</Button>
                            </ButtonWrapper>
                        )}
                    </>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </Container>
    );
};

export default NotiContent;
