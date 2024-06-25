import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITelegramUser, IWebApp } from "../utils/interface";
import useScript from "../utils/useScript";

interface MainContextProps {
    countryModal: boolean;
    setCountryModal: Dispatch<SetStateAction<boolean>>;
    countryModalHandler: Function;
    user?: any
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {

    
    const [countryModal, setCountryModal] = useState<boolean>(JSON.parse(window.localStorage.getItem("countryModal") as string) === false ? false : true);
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user") as string))
    const scriptLoaded = useScript('https://telegram.org/js/telegram-web-app.js');

    console.log("scriptLoaded", scriptLoaded)
    const countryModalHandler = () => {
        window.localStorage.setItem("countryModal", "false");
        setCountryModal(false);
    }

    useEffect(() => {
        if (scriptLoaded && window.Telegram) {
          const tg = window.Telegram.WebApp;
          tg.ready();
            console.log("------", tg.initDataUnsafe.user)
        }
      }, [scriptLoaded]);


    
    const contextValue: MainContextProps = {
        countryModal,
        setCountryModal,
        countryModalHandler
    };

    return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
}

export const useMainContext = () => {
    const context = useContext(MainContext);

    if (!context) {
        throw new Error("MainContext must be used within a MainContextProvider");
    }

    return context;
}