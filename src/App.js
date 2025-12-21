import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/ui/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import './styles/App.css';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <Router>
                <Navbar/>
                <AppRouter/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;