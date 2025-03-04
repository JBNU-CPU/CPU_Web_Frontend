import React, {useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1002;
  align-items: center;
  justify-content: center;
  background :black;
  width: 100%;
  height: 100%;
`;
const ButtonWrapper = styled.div`
  width: 100vw;
  max-width: calc(80vh * 9 / 16);
  height: 40px;
  display:flex;
  align-items: center;
  background:black;
`
const ExitBtn = styled(ImExit)`
  background:none;
  color: white;
  height:60%;
  width: auto;
  margin-left: 10px;
  padding: none;
  cursor: pointer;
`
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
  p{
    font: normal 16px 'arial';
    background: none;
    color: white;
    z-index: 10;
    text-shadow: 5px 5px 5px #000;
  }
`

function EventGame(){
  const navigate = useNavigate();

  const { unityProvider, isLoaded, loadingProgression} = useUnityContext({
    loaderUrl: "/Build/CpuShootingGameBuild.loader.js",
    dataUrl: "/Build/CpuShootingGameBuild.data",
    frameworkUrl: "/Build/CpuShootingGameBuild.framework.js",
    codeUrl: "/Build/CpuShootingGameBuild.wasm",
  });
  const loadingPercentage = Math.round(loadingProgression * 100);

  const handleGoBack = () => {
    navigate("/");
  }

  return(
    <Container>
      <ButtonWrapper>
        <ExitBtn onClick={handleGoBack}/>
      </ButtonWrapper>
      <UnityWrapper>
        {isLoaded === false && (
          <Loading>
            <p>Loading... ({loadingPercentage}%)</p>
          </Loading>
        )}
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </UnityWrapper>
    </Container>
  );
}

export default EventGame;