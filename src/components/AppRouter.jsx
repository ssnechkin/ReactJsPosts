import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
/*
import Home from "../pages/Home";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostId from "../pages/PostId";
import Login from "../pages/Login";
import Error from "../pages/Error";
*/
import Error from "./ui/loader/Loader";
import {AuthContext} from "../context";
import {privateRoutes, publicRoutes} from "../router";

const AppRouter = function () {
        const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);

        if (isLoading) {
            return '<Loader/>'
        }

        return (
            isAuth
            ? <Routes>
                {privateRoutes.map(rout =>
                    <Route
                        element={rout.component}
                        path={rout.path}
                        exact={rout.exact}
                        key={rout.path}
                    />
                )}

                {/* <Route path="/" element={<Home />} />
                <Route path="/about" element={<About/>} />
                <Route path="/posts" exact element={<Posts/>} />  */}{/* exact - для дублирующих путей */}{/*
                <Route path="/posts/:id" exact element={<PostId/>} /> */}
                <Route path="*" element={<Navigate to="/error" replace />} key="redirect_error" />
            </Routes>

            : <Routes>
                {publicRoutes.map(rout =>
                    <Route
                        element={rout.component}
                        path={rout.path}
                        exact={rout.exact}
                        key={rout.path}
                    />
                )}
                {/* <Route path="/login" element={<Login />} /> */}
                {<Route path="*" element={<Navigate to="/login" replace />} key="redirect_login" />}
            </Routes>
        );
}

export default AppRouter;