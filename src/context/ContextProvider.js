import { createContext, useContext, useState } from "react";


const StateContext = createContext();
const initalState = {
    chat: false,
    cart: false,
    notification: false,

}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [user, setuser] = useState(false);
    const [isClicked, setisClicked] = useState(initalState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [currentColor, setCurrentColor] = useState('#03C9D7');


    // store the ai result
    const [websiteresult, setwebsiteresult] = useState(null);
    const [adminoutput, setadminoutput] = useState([]);
    const handleClick = (clicked) => {
        setisClicked({ ...isClicked, [clicked]: true });
    }
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false)
    };
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false)
    };

    return <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initalState, setisClicked, setActiveMenu, setMode, setColor, themeSettings, setThemeSettings, user, setuser, websiteresult, setwebsiteresult, adminoutput, setadminoutput }}
    >{children}</StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);