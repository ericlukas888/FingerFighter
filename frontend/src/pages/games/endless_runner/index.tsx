import { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Unity, useUnityContext } from "react-unity-webgl";

function EndlessRunnerGame() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [userName, setUserName] = useState();
    const [score, setScore] = useState();

    const { unityProvider, sendMessage, addEventListener, removeEventListener } =
        useUnityContext({
            loaderUrl: "Build/finger.loader.js",
            dataUrl: "Build/finger.data",
            frameworkUrl: "Build/finger.framework.js",
            codeUrl: "Build/finger.wasm",
        });
    return (
        <div className="EndlessRunnerGame mb-5 pt-3">
            <Container>
                <h5>Finger Tap Race</h5>
                <hr/>
            <Unity unityProvider={unityProvider} style={{width: "100%", height: "80vh"}}/>
            </Container>
        </div>
    );
}

export default EndlessRunnerGame;
