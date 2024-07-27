import React, { ReactNode, createContext, useContext, useState } from 'react'
import { Item, initialItems } from '../constants';

interface AppState {
    items: Item[];
    addItem: (item: Item) => void;
}

const AppContext = createContext<AppState | undefined>(undefined)

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>(initialItems);

    // --- for adding item --
    const addItem = (item: Item) => {
        setItems((prevItems) => [...prevItems, item])
    }

    return (
        <AppContext.Provider value={{ items, addItem }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};