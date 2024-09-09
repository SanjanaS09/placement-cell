import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebaseConfig'; 
import { ref, set, push } from 'firebase/database'; // Importing 'push'

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Updated signup function using push
    const signup = async (email, password, userData = {}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            setUser(newUser);

            // Generate a new unique key for each user under 'User/Student'
            const userRef = ref(database, 'User/Student');
            const newUserRef = push(userRef); // Using push to generate unique ID

            console.log("Saving user data with push:", {
                uid: newUser.uid,
                email: newUser.email,
                ...userData,
            });

            // Save user data under the generated unique key
            await set(newUserRef, {
                uid: newUser.uid,
                email: newUser.email,
                ...userData,
            });

            console.log("User data saved to database successfully");

            return userCredential;
        } catch (error) {
            console.error('Sign up failed:', error.message);

            if (error.code) {
                console.error('Error code:', error.code);
            }
            if (error.message) {
                console.error('Error message:', error.message);
            }

            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;
            setUser(loggedInUser);

            // Optional: Retrieve user data from Firebase if needed

            return userCredential;
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        login,
        signup,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
