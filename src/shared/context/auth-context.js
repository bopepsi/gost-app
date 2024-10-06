import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    name: "",
    role: "",
    token: "",
    login: () => { },
    logout: () => { }
});