import { createContext, useContext } from "react";


export const RootContext = createContext<any| null>(null);

export const useStores = () => {
    const context = useContext(RootContext)
    return context
}