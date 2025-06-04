import { useContext, createContext, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'; 
import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase/firebase'; // Adjust the import path as necessary

const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            // Add or overwrite user in Firestore
            await setDoc(doc(db, 'usuaris', userId), {
            email: email,
            username: name,
            }, { merge: true });
            return userCredential;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    };

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error logining user:", error);
            throw error;
        }
    };

    const logOut = () => {
        return signOut(auth);
        
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
        setCurrentUser(user);
        setLoading(false);
        });
        return unsubscribe;
    }, []);
    
    return <AuthContext.Provider value={{currentUser, loading, registerUser, loginUser, logOut}}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;

export function useAuth(){
    return useContext(AuthContext);
};

