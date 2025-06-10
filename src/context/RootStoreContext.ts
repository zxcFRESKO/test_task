import { createContext, useContext } from "react";
import { type IRootStore } from "../stores/root.store";

export const RootContext = createContext<IRootStore | null >(null);

export const useStores = () => {
    const context = useContext(RootContext)
    return context
}