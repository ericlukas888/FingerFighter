import { useState, useEffect, useCallback } from "react";
import { Button, Container } from "react-bootstrap";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useMainContext } from "../../../context/MainContext";
import axios from "axios";

interface GameHistoryProps {
    id: number;
    userId: number;
    gameId: number;
    score: number;
    status: string;
}

interface DataObject {
    userId: string;
    historyId: string;
    score: number;
}

interface Window {
    receiveDataFromUnity: (jsonString: string) => void;
}

function EndlessRunnerGame() {
    const { user } = useMainContext();
    const [history, setHistory] = useState<GameHistoryProps | null>(null);
    // const [score, setScore] = useState(0)

    

    const endGame = async (score:any) => {
        const body = {
            historyId: history?.id,
            score: score
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/gamehistory/endGame`, body)
            .then(function (response) {
                console.log("endGame-----", response.data)
            })
            .catch(function (error) {
                console.log("error", error)
            })
    }

    useEffect(() => {
        (window as any).receiveDataFromUnity = (score: any) => {
            // const data: DataObject = JSON.parse(jsonString);
            console.log('Data received from Unity:', score);
            // setScore(data.score);
            endGame(score);
            // You can now use the data as needed in your React application
        };
    }, [window])

    const { unityProvider, sendMessage, addEventListener, removeEventListener } =
        useUnityContext({
            loaderUrl: "Build/Marathon.loader.js",
            dataUrl: "Build/Marathon.data",
            frameworkUrl: "Build/Marathon.framework.js",
            codeUrl: "Build/Marathon.wasm",
        });

    
    const startGame = async () => {
        const body = {
            userId: user?.id,
            gameId: 1
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/gamehistory/startGame`, body)
            .then(function (response) {
                console.log("startGame----", response.data.history)
                setHistory(response.data.history);
                // sendMessage('GameManager', 'SetInformation', `${user?.id},${response.data.history?.id}`)
            })
            .catch(function (error) {
                console.log("error", error)
            })
    }

    useEffect(() => {
        startGame();
    }, []);

    
    return (
        <div className="EndlessRunnerGame mb-5 pt-3">
            <Container>
                <h5>Finger Tap Race</h5>
                <hr />
                {/* <Button className="main-button w-100" onClick={startGame}>Start Game</Button>
                <Button className="main-button w-100" onClick={endGame}>End Game</Button> */}
                <Unity unityProvider={unityProvider} style={{ width: "100%", height: "80vh" }} />
            </Container>
        </div>
    );
}

export default EndlessRunnerGame;
