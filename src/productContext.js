import { data } from './assets/data';

import { createContext, useContext, useState } from 'react';
import { useAuthValue } from './authContext';


// toast notification
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";




// creating context
export const productContext = createContext();

// custom context hook
export function useProductContext(){
    const value = useContext(productContext);
    return value;
}

// custom Provider
export default function CustomProductContext({ children }){
    // user's login status and loggedIn user
    const {isLoggedIn, useLoggedIn, setLoggedIn, setUserLoggedIn} = useAuthValue();

    const [cart, setCart] = useState([]);
    const [itemInCart, setItemInCart] = useState(0);

    // function to add product to cart
    function addToCart(product){
        // check whether iser is logged in or not
        if(!isLoggedIn){
            toast.error("Please first Login !!!");
            return;
        }

        const index = cart.findIndex((item) => item.name === product.name);

        if(index !== -1){
            toast.success("Product Quantity Increased!!");
            return;
        }

        setItemInCart(itemInCart + 1);
        console.log('Item added to cart:: ',itemInCart);
        toast.success("Added to your Cart!!")
    }

    return(
        <productContext.Provider value={
            {data,
             addToCart,
            }
        }>
            {children}
        </productContext.Provider>
    )
}