import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface MainContextProps {
    countryModal: boolean;
    setCountryModal: Dispatch<SetStateAction<boolean>>;
    countryModalHandler: Function;

}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {

    const [webApp, setWebApp] = useState(null);
    const [countryModal, setCountryModal] = useState<boolean>(JSON.parse(window.localStorage.getItem("countryModal") as string) === false ? false : true);

    const countryModalHandler = () => {
        window.localStorage.setItem("countryModal", "false");
        setCountryModal(false);
    }

    useEffect(() => {
        const app = (window as any).Teleram?.WebApp;
        console.log("app",app)
        if (app) {
            app.ready();
            setWebApp(app);
        }
    }, []);

    const contextValue: MainContextProps = {
        countryModal,
        setCountryModal,
        countryModalHandler
    }

    return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
}

export const useMainContext = () => {
    const context = useContext(MainContext);

    if (!context) {
        throw new Error("MainContext must be used within a MainContextProvider");
    }

    return context;
}