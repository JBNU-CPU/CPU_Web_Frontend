import React, {useState, useEffect} from "react";
import styled from "styled-components";
import img1 from "./SliderImg/img1.png";
import img2 from "./SliderImg/img2.png";
import img3 from "./SliderImg/img3.png";
import img4 from "./SliderImg/img4.png";
import img5 from "./SliderImg/img5.png";

const images = [img1, img2, img3, img4, img5];

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  height: ${props => (props.isMain ? "100vh" : "40vh")};
  @media screen and (min-width: 1024px) {
    height: ${props => (props.isMain ? "100vh" : "40vh")};
  }
`;
const Images = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 2s ease-in-out;
  opacity: 0;
  filter: blur(1px);
  &.active {
    opacity: 1;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const TitleWrap = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f5f7ff;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: default;
  @media screen and (max-width: 768px) {
    top: 50%;
  }
  @media screen and (min-width: 1024px) {
    top: ${props => (props.isMain ? "50%" : "60%")};
  }

  h1 {
    margin: 0;
    font-size: 50px;
    background-color: rgba(0, 0, 0, 0);
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    white-space: pre-line;
    @media screen and (max-width: 768px) {
      font-size: 30px;
    }
    @media screen and (min-width: 1024px) {
      font-size: ${props => (props.isMain ? "80px" : "50px")};
    }
  }
  h3 {
    margin: 0;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0);
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    margin-top: 10px;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 20px;
      margin-top: 15px;
    }
  }
`;

const ImgSlider = ({title, content = "", isMain = false}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <Slider isMain={isMain}>
      {images.map((image, index) => (
        <Images
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{backgroundImage: `url(${image})`}}
        />
      ))}
      <TitleWrap isMain={isMain}>
        <h1>{title}</h1>
        <h3>{content}</h3>
      </TitleWrap>
    </Slider>
  );
};
export default ImgSlider;
