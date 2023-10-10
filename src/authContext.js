import { useState , useEffect, createContext, useContext, } from "react";

// firebase database
import {db} from './firebaseInit';
import { collection, addDoc, onSnapshot } from "firebase/firestore";


// 1. create context
const authContext = createContext();

function useAuthValue(){
    const value = useContext(authContext);
    return value;
}

// 2. customProvider
function CustomAuthContext({children}){
    // List of all users in database
    const [userList, setUserList] = useState([]);
    // login user status
    const [isLoggedIn, setLoggedIn] = useState(false);

    // getting all the users from database 
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'buybusy'), (snapShot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setUserList(users);
        });

        console.log('fetching data from db Unsub:: ',unsub);
    }, [isLoggedIn]);


    // creating new user
    async function createUser(data){
        // checking whether the email address aleady in use or not
        const index = userList.findIndex((user) => user.email === data.email);

        // if found email display notification
        if(index !== -1){
            return;
        }

        // if email not found create new user
        const docRef = await addDoc(collection(db, 'buybusy'), {
            name: data.name,
            email: data.email,
            password: data.password,
        });
    }

    return(
        <authContext.Provider value={ createUser }>
            {children}
        </authContext.Provider>
    )
}


export {authContext, useAuthValue};
export default CustomAuthContext;