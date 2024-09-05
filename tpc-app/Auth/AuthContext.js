import { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 

// Create an AuthContext
const AuthContext = React.createContext();

// Create a provider component to wrap your app with the AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add an onAuthStateChanged listener to update the user state
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};