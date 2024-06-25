import { useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function EndlessRunnerGame() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [userName, setUserName] = useState();
    const [score, setScore] = useState();

    const { unityProvider, sendMessage, addEventListener, removeEventListener } =
        useUnityContext({
            loaderUrl: "/games/endless_runner/Build/Build.loader.js",
            dataUrl: "/games/endless_runner/Build/Build.data",
            frameworkUrl: "/games/endless_runner/Build/Build.framework.js",
            codeUrl: "/games/endless_runner/Build/Build.wasm",
        });
    return (
        <div className="EndlessRunnerGame">
            <Unity unityProvider={unityProvider} />
        </div>
    );
}

export default EndlessRunnerGame;
