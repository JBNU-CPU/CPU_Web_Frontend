import * as React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: fixed;
  z-index: 1002;
  justify-content: center;
  align-items: center;
  background :black;
  width: 100%;
  height: 100%;
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

function EventGame(){

  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/CpuShootingGameWebGLAgain.loader.js",
    dataUrl: "/Build/CpuShootingGameWebGLAgain.data",
    frameworkUrl: "/Build/CpuShootingGameWebGLAgain.framework.js",
    codeUrl: "/Build/CpuShootingGameWebGLAgain.wasm",
});

return(
    <Container>
        <UnityWrapper>
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </UnityWrapper>
    </Container>
  );
}

export default EventGame;