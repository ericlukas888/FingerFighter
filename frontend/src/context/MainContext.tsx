import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITelegramUser, IWebApp } from "../utils/interface";

interface MainContextProps {
    countryModal: boolean;
    setCountryModal: Dispatch<SetStateAction<boolean>>;
    countryModalHandler: Function;
    // webApp: IWebApp;
    // user? : ITelegramUser;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {

    const [webApp, setWebApp] = useState<IWebApp | null>(null);
    const [countryModal, setCountryModal] = useState<boolean>(JSON.parse(window.localStorage.getItem("countryModal") as string) === false ? false : true);

    const countryModalHandler = () => {
        window.localStorage.setItem("countryModal", "false");
        setCountryModal(false);
    }

    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
          app.ready();
          setWebApp(app);
        }
      }, []);

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