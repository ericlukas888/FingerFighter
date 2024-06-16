import { useEffect, useState } from 'react';
import './rocket.css';

export const Rocket = () => {

    const [count, setCount] = useState<number>(1);
    const onClick = () => {
        setCount((preValue) => {
            const newValue = preValue + 1;
            return newValue
        })
    }

    return (       
        <>
            <div className="Rocket rounded-4">
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="hover-area"></div>
                <div className="star-field">
                    <div className="stars stars-sm"></div>
                    <div className="stars stars-md"></div>
                    <div className="stars stars-sm"></div>
                </div>
                <div className="ship" onClick={onClick}>
                    <div className="wrapper">
                        <div className="body side left"></div>
                        <div className="body main">
                            <div className="wing left"></div>
                            <div className="wing right"></div>
                            <div className="booster"></div>
                            <div className="exhaust"></div>
                        </div>
                        <div className="body side right"></div>
                    </div>
                </div>
            </div>
            <div className='text-center'>{count}</div>
        </> 
    )
}