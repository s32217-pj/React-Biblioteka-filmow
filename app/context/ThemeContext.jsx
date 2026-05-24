'use client';

import { createContext, useCallback, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeContext.Provider value={[ theme, toggleTheme ]}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context)
        throw new Error("useTheme moze byc uzyty tylko wewnatrz ThemeProvider");

    return context;
}