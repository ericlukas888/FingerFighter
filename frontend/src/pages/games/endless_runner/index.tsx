import { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Unity, useUnityContext } from "react-unity-webgl";

function EndlessRunnerGame() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [userName, setUserName] = useState();
    const [score, setScore] = useState();

    const { unityProvider, sendMessage, addEventListener, removeEventListener } =
        useUnityContext({
            loaderUrl: "games/endless_runner/Build/finger.loader.js",
            dataUrl: "games/endless_runner/Build/finger.data",
            frameworkUrl: "games/endless_runner/Build/finger.framework.js",
            codeUrl: "games/endless_runner/Build/finger.wasm",
        });
    return (
        <div className="EndlessRunnerGame mb-5 pt-3">
            <Container>
                <h5>Finger Tap Race</h5>
                <hr/>
            </Container>
            <Unity unityProvider={unityProvider} />
        </div>
    );
}

export default EndlessRunnerGame;
