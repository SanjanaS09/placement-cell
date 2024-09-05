
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../src/firebaseConfig';

const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider(){
    const [currentUser, setCurrentUser] = useState()

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(useer => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

   
    const value = {
        currentUser,
        login
    }
    return(
        <AuthContext.Provider value = {_readValueToProps}>
            {children}
        </AuthContext.Provider>
    )
}