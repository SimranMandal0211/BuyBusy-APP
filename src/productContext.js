import { data } from './assets/data';

import { createContext, useContext } from 'react';

// creating context
export const productContext = createContext();

// custom context hook
export function useProductContext(){
    const value = useContext(productContext);
    return value;
}

// custom Provider
export default function CustomProductContext({ children }){
    return(
        <productContext.Provider value={
            {data,}
        }>
            {children}
        </productContext.Provider>
    )
}