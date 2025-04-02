import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Carousel} from "react-responsive-carousel"; //npm install react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";

import posts from "../galleryPosts/Posts";
import List_Btn from "../components/List_Btn";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  @media screen and (min-width: 1024px) {
    margin-top: 110px;
  }
`;
const MainWrap = styled.div`
  width: 85%;
  background: transparent;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1024px) {
    width: 70%;
  }
`;
const Title = styled.text`
  color: #f5f7ff;
  font-size: 25px;
  margin-top: 15px;
  background-color: rgba(0, 0, 0, 0);
  @media screen and (min-width: 768px) {
    margin-top: 25px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 28px;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #6f7486;
  align-self: center;
  margin: 10px 0 5px 0;
`;
const InfoWrap = styled.div`
  align-self: end;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 10px;
`;
const InfoT = styled.text`
  color: #bcc0cf;
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0);
  @media screen and (min-width: 1024px) {
    font-size: 12px;
  }
`;
const ContentWrap = styled.div`
  width: 95%;
  background-color: rgba(0, 0, 0, 0);
  align-self: center;
  margin: 10px;
`;
const ContentT = styled.text`
  color: #bcc0cf;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0);
  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;
const StyledCarousel = styled(Carousel)`
  margin: 0;
  background: transparent;

  @media screen and (min-width: 1024px) {
    display: none;
  }
  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slide img {
    width: 90%;
    height: auto;
    border-radius: 5px;
    @media screen and (min-width: 768px) {
      width: 60%;
    }
  }
  .control-dots {
    flex-direction: row;
    display: flex;
    justify-content: center;
    background: none;
  }
  .thumbs-wrapper {
    margin: 0 5%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .thumbs {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .thumb {
    width: 60px !important;
    height: 50px;
    border: none;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  .thumb.selected {
    border: 1.5px solid #bcc0cf;
  }
  .thumb:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .carousel-status {
    display: none; /* 요소를 숨깁니다 */
  }
`;
const CustomIndicator = styled.div`
  width: 5px; /* 인디케이터 크기 */
  height: 5px;
  background-color: ${props => (props.active ? "#f5f7ff" : "#6F7486")};
  border-radius: 50%;
  margin: 0 5px; /* 간격 */
  cursor: pointer;
  &:hover {
    background-color: #f5f7ff; /* 호버 효과 */
  }
`;

const ImageWrap = styled.div`
  display: none;
  @media screen and (min-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ImageItem = styled.img`
  width: 75%;
  height: auto;
  @media screen and (min-width: 1024px) {
    margin-top: 20px;
  }
`;

const GalleryDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const post = posts.find(item => item.id === parseInt(id));

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024); //사이즈 감지
    window.addEventListener("resize", handleResize); //창 크기 변경 시 발생
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!post) {
      alert("해당 게시물을 찾을 수 없습니다.");
      navigate("/gallery");
    }
  }, [post, navigate]);

  //줄바꿈(엔터) 처리
  const enterDescription = post.description.split("\n").map((line, index) => (
    <ContentT key={index}>
      {line}
      <br />
    </ContentT>
  ));

  const renderIndicator = (onClickHandler, isSelected) => {
    return <CustomIndicator active={isSelected} onClick={onClickHandler} />;
  };

  return (
    <>
      <Container>
        <MainWrap>
          <Title>{post.title}</Title>
          <Line />
          <InfoWrap>
            <InfoT>
              {post.author} | {post.date} |{" "}
            </InfoT>
          </InfoWrap>
          <ContentWrap>{enterDescription}</ContentWrap>

          {isDesktop ? (
            <ImageWrap>
              {post.image.map((img, index) => (
                <ImageItem key={index} src={img} alt={`Image ${index}`} />
              ))}
            </ImageWrap>
          ) : (
            // 웹일 때는 이미지 나열
            <StyledCarousel useKeyboardArrows autoPlay={false} swipeable emulateTouch renderIndicator={renderIndicator}>
              {post.image.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`Image ${index}`} />
                </div>
              ))}
            </StyledCarousel>
          )}
        </MainWrap>
        <List_Btn />
      </Container>
      <Footer />
    </>
  );
};

export default GalleryDetail;
