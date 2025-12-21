import Login from "../pages/Login";
import Home from "../pages/Home";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostId from "../pages/PostId";
import Error from "../pages/Error";

export const privateRoutes = [
    {path: '/', component: <Home />, exact: false},
    {path: '/about', component: <About />, exact: false},
    {path: '/posts', component: <Posts />, exact: true},
    {path: '/posts:id', component: <PostId />, exact: true},
    {path: '/error', component: <Error />, exact: false}
]

export const publicRoutes = [
    {path: '/login', component: <Login />, exact: false}
]