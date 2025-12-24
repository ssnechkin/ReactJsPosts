import React, {useContext}  from 'react';
import MyInput from "../components/ui/input/MyInput";
import MyButton from "../components/ui/button/MyButton";
import {AuthContext} from "../context";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import classes from './Login.module.css';

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
            <div className={classes.formLoginBase}>
                <div className={classes.formLogin}>
                    <h1>Войти в TrustCore</h1>
                    <form onSubmit={login}>
                        <FloatingLabel
                          controlId="userInput"
                          label="Введите логин"
                          className="mb-3"
                        >
                          <Form.Control type="text" placeholder="Введите логин" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="passwordInput"
                          label="Введите пароль"
                          className="mb-3"
                        >
                          <Form.Control type="password" placeholder="Введите пароль" />
                        </FloatingLabel>
                        <div class="d-grid gap-2">
                          <button class="btn btn-primary" type="button" onClick={login}>Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;