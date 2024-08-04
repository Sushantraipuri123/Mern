import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export const AuthProvider =({children})=>{

    const [token, setToken] = useState(() => localStorage.getItem('token') || '');


    const storeTokenInLocalStorage = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken);
    };

    const isLoggedin = !!token;

    // Logout user by removing token and clearing state
    const LogoutUser = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    // Effect to synchronize token state with localStorage
    useEffect(() => {
        if (!token) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', token);
        }
    }, [token]);

    return  (
        <AuthContext.Provider value={{storeTokenInLocalStorage, isLoggedin, LogoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}


// ==custom hook ==
export const useAuth  =()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}