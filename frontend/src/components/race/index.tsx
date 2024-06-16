import { Card, Image } from "react-bootstrap";
import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import './race.css';

export const RaceGame = () => {
  const fingerRef = useRef<HTMLDivElement>(null);
  const raceGameRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [initialPositionX, setInitialPositionX] = useState(0);
  const [initialPositionY, setInitialPositionY] = useState(0);
  const [totalDistance, setTotalDistance] = useState(5000);
  const [highScoreArray, setHighScoreArray] = useState<Array<[number, number]>>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timerDisplay, setTimerDisplay] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    populateHighscores();
  }, []);

  useEffect(() => {
    if (isDragging && startTime) {
      updateTimer();
    }
  }, [isDragging, startTime]);

  const populateHighscores = () => {
    const highScoresJSON = localStorage.getItem('highscores');
    if (!highScoresJSON) {
      setHighScoreArray([]);
    } else {
      const scores = JSON.parse(highScoresJSON) as Array<[number, number]>;
      scores.sort((a, b) => a[0] - b[0]);
      setHighScoreArray(scores);
    }
  };

  const startDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const fingerElement = fingerRef.current;

    if (fingerElement) {
      setOffsetX(touch.clientX - fingerElement.getBoundingClientRect().left);
      setOffsetY(touch.clientY - fingerElement.getBoundingClientRect().top);
      setInitialPositionX(fingerElement.offsetLeft);
      setInitialPositionY(fingerElement.offsetTop);

      if (!startTime) {
        setStartTime(performance.now());
      }
    }
  };

  const drag = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const newX = touch.clientX - offsetX;
    const newY = touch.clientY - offsetY;
    const distanceY = newY - initialPositionY;

    setTotalDistance((prevDistance) => prevDistance - distanceY);
    setInitialPositionY(newY);

    if (fingerRef.current) {
      // fingerRef.current.style.left = `${newX}px`;
      // fingerRef.current.style.top = `${newY}px`;
    }

    if (raceGameRef.current) {
      raceGameRef.current.style.backgroundPositionY = `${newY}px`;
    }
  };

  const endDrag = () => {
    setIsDragging(false);

    if (fingerRef.current) {
      fingerRef.current.style.left = '';
      fingerRef.current.style.top = '';
    }
  };

  const updateTimer = () => {
    timerIdRef.current = setInterval(() => {
      if (startTime) {
        const currentTime = performance.now();
        const elapsedTime = Math.round(currentTime - startTime);

        if (totalDistance > 0) {
          setTimerDisplay(elapsedTime);
        } else if (!gameComplete) {
          clearInterval(timerIdRef.current!);
          setHighScoreArray((prevScores: any) => {
            const newScores = [...prevScores, [elapsedTime, Date.now()]];
            localStorage.setItem('highscores', JSON.stringify(newScores));
            return newScores;
          });
          setGameComplete(true);
        }
      }
    }, 10);
  };

  const handleAgainClick = () => {
    window.location.reload();
  };

  const formatEpochTime = (epoch: number) => {
    const date = new Date(epoch);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <div ref={raceGameRef} className="RaceGame">
      <button onClick={handleAgainClick} style={{ display: gameComplete ? 'block' : 'none' }}>🔄 Play again</button>
      <div
        id="finger-left"
        className="finger left"
        ref={fingerRef}
        onTouchStart={startDrag}
        onTouchMove={drag}
        onTouchEnd={endDrag}
        style={{ position: 'absolute', left: '0px', top: '0px' }}
      >👇</div>
      {/* <div id="highscores">
        {highScoreArray.length === 0 ? (
          'No highscores yet.'
        ) : (
          <table>
            <thead>
              <tr>
                <th colSpan={3}>Local highscores</th>
              </tr>
            </thead>
            <tbody>
              {highScoreArray.slice(0, 3).map(([score, date], index) => (
                <tr key={index}>
                  <td>⏱️{score} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
      {/* <p >🏁 <span id="distance">{totalDistance}</span> m to go!<br />Swipe fast!</p>
      <p>⏱️ <span id="timer">{timerDisplay}</span> ms</p> */}
    </div>
  );
};