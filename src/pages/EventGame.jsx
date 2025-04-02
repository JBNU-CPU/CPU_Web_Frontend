import React, {useEffect, useState} from "react";
import {Unity, useUnityContext} from "react-unity-webgl";
import styled from "styled-components";
import {useNavigate, useLocation} from "react-router-dom";
import {ImExit} from "react-icons/im";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1002;
  align-items: center;
  justify-content: center;
  background: black;
  width: 100%;
  height: 100%;
`;
const ButtonWrapper = styled.div`
  width: 100vw;
  max-width: calc(80vh * 9 / 16);
  height: 40px;
  display: flex;
  align-items: center;
  background: black;
`;
const ExitBtn = styled(ImExit)`
  background: none;
  color: white;
  height: 60%;
  width: auto;
  margin-left: 10px;
  padding: none;
  cursor: pointer;
`;
const UnityWrapper = styled.div`
  width: 100vw;
  height: calc(100vw * 16 / 9); /* 16:9 비율 유지 */
  max-width: calc(80vh * 9 / 16);
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  p {
    font: normal 16px "arial";
    background: none;
    color: white;
    z-index: 10;
    text-shadow: 5px 5px 5px #000;
  }
`;

function EventGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const isInputPw = location.state?.isInputPw || false;

  const {unityProvider, isLoaded, loadingProgression} = useUnityContext({
    loaderUrl: "/Build/CpuShootingGameBuild.loader.js",
    dataUrl: "/Build/CpuShootingGameBuild.data",
    frameworkUrl: "/Build/CpuShootingGameBuild.framework.js",
    codeUrl: "/Build/CpuShootingGameBuild.wasm",
  });
  const loadingPercentage = Math.round(loadingProgression * 100);

  useEffect(() => {
    if (!isInputPw) {
      alert("잘못된 접근입니다.");
      navigate("/"); // 홈으로 이동
    }
  }, [isInputPw, navigate]);

  const handleGoBack = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    // 현재 페이지를 히스토리에 추가하여 뒤로 가기 버튼을 눌러도 같은 URL 유지
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.location.href = "/"; // 뒤로 가기 시 강제 새로고침
    };

    // 뒤로 가기 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    //모바일에서 확대 방지 (viewport 설정)
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(metaTag);

    //입력 필드 클릭 시 확대 방지
    const preventZoomOnFocus = event => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        document.documentElement.style.zoom = "1.0";
      }
    };

    document.addEventListener("focusin", preventZoomOnFocus);

    return () => {
      document.removeEventListener("focusin", preventZoomOnFocus);
    };
  }, []);

  return (
    <Container>
      <ButtonWrapper>
        <ExitBtn onClick={handleGoBack} />
      </ButtonWrapper>
      <UnityWrapper>
        {isLoaded === false && (
          <Loading>
            <p>Loading... ({loadingPercentage}%)</p>
          </Loading>
        )}
        <Unity unityProvider={unityProvider} style={{width: "100%", height: "100%"}} />
      </UnityWrapper>
    </Container>
  );
}

export default EventGame;
