import { createContext, useState, useContext, useEffect } from "react";
import getState from "../store"; // Importamos tu store.jsx

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [state, setState] = useState(null);

    useEffect(() => {
        let currentState;
        
        const initializedStore = getState({
            getStore: () => currentState.store,
            getActions: () => currentState.actions,
            setStore: (updatedStore) => {
                currentState = {
                    store: { ...currentState.store, ...updatedStore },
                    actions: { ...currentState.actions }
                };
                setState(currentState);
            }
        });
        currentState = initializedStore;
        setState(currentState);
    }, []);

    if (!state) return null; 

    return (
        <StoreContext.Provider value={{ store: state }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}