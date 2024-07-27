import React, { ReactNode, createContext, useContext, useState } from 'react'
import { Item, initialItems } from '../constants';

interface AppState {
    items: Item[];
    addItem: (item: Item) => void;
    moveItem: (fromIndex: number, toIndex: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined)

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>(initialItems);

    // --- for adding item --
    const addItem = (item: Item) => {
        setItems((prevItems) => [...prevItems, item])
    }

    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setItems(updatedItems);
    };

    return (
        <AppContext.Provider value={{ items, addItem, moveItem }}>
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