import { data } from './assets/data';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthValue } from './authContext';


// toast notification
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

// database
import {db} from './firebaseInit';
import {doc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';


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
    const {isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn} = useAuthValue();

    const [cart, setCart] = useState([]);
    const [itemInCart, setItemInCart] = useState(0);
    const [total, setTotal] = useState(0);

    // to check if the user is still logged in on page refresh 
    useEffect(() => {
        const token=window.localStorage.getItem('token');
        if(token){
            const index = window.localStorage.getItem('index');
            const user = JSON.parse(index);
            setLoggedIn(token);
            setUserLoggedIn(user);
        }
    }, []);

    // getting real time update of user's cart 
    useEffect(() => {
        if(isLoggedIn){
            const unsub = onSnapshot(doc(db, 'buybusy', userLoggedIn.id), (doc) => {
                setCart(doc.data().cart);
            });

            let sum = 0;
            cart.map((item) => Number(sum+= item.price));
            setTotal(sum);
            setItemInCart(cart.length);
        }
    }, [userLoggedIn]);

    
    // function to add product to cart
    async function addToCart(product){
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

        // add product to the cart of loggedIn user
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayUnion({quantity:1, ...product})
        });
        setTotal(Number(total + product.price));
        setItemInCart(itemInCart + 1);
        console.log('Item added to cart:: ',itemInCart);
        toast.success("Added to your Cart!!")
    }

    return(
        <productContext.Provider value={
            {data,
             addToCart,
             cart,
            }
        }>
            {children}
        </productContext.Provider>
    )
}