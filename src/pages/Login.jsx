import React, {useContext}  from 'react';
import MyInput from "../components/ui/input/MyInput";
import MyButton from "../components/ui/button/MyButton";
import {AuthContext} from "../context";

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault(); // Запрет на обновление страницы
        if(!isAuth) {
            setIsAuth(true);
            localStorage.setItem('auth', 'true');
        }
    }

    return (
        <div>
            <h1>Страница аутентификации</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логи"/>
                <MyInput type="text" placeholder="Пароль"/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
}

export default Login;