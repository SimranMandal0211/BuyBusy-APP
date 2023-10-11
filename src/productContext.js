import { data } from './assets/data';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthValue } from './authContext';


// toast notification
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

// database
import {db} from './firebaseInit';
import {doc, updateDoc, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';


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

    const [myorders, setMyOrders] = useState([]);
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
                setMyOrders(doc.data().orders);
            });

            let sum = 0;
            cart.map((item) => Number(sum += item.price));
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
            increaseQty(cart[index]);
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

    // remove single product from cart
    async function removeFromCart(product){
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });
        setTotal(Number(total - (product.quantity * product.price)));
        setItemInCart(itemInCart - product.quantity);
        toast.success('Removed from Cart!!');
    }


    // to increase item's quentity
    async function increaseQty(product){
        const index = cart.findIndex((item) => item.name === product.name);
        cart[index].quantity++;
        setCart(cart);

        // update cart in firebase databse
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });

        setItemInCart(itemInCart + 1);
        setTotal(Number(total + cart[index].price));
    }

    // to decrease item's quantity
    async function decreaseQty(product){
        const index = cart.findIndex((item) => item.name === product.name);
        setTotal(Number(total - cart[index].price));

        // change qty of product and update cart array
        if(cart[index].quantity > 1){
            cart[index].quantity--;
        }else{
            cart.splice(index, 1);
        }


        // update cart and item Count
        setCart(cart);
        setItemInCart(itemInCart - 1);

        // update cart in array
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
    }

    // purchase all items in cart
    async function purchaseAll(){
        // get current data from function
        const currentDate = getDate();

        // adding order to database
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, {
            orders: arrayUnion({ date: currentDate, list: cart, amount: total})
        });

        // empty cart
        clearCart();
    }

    // remove all product from cart
    async function clearCart(){
        if(itemInCart === 0){
            toast.error('Nothing to remove in Cart!!');
            return;
        }

        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, {
            cart: []
        });

        setTotal(0);
        setItemInCart(0);
        toast.success('Empty Cart!!');
    }


    // return data in yy/mm//dd format
    function getDate(){
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return (`${year}-${month}-${day}`);
    }

    return(
        <productContext.Provider value={
            {data,          //MainContent
             addToCart,     //use in ItemCart component
             cart,          //Cart component

             removeFromCart,    //CartItem component
             increaseQty,
             decreaseQty,

            
            }
        }>
            {children}
        </productContext.Provider>
    )
}