import React, { useState } from 'react';
import LoginForm from './LoginForm';

const AuthComponent = () => {
    const [token, setToken] = useState('');

    const handleLogin = async (username, password) => {
        // Отправка запроса на сервер для аутентификации
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;
            setToken(token);
        } else {
            // Обработка ошибок
            console.error('Authentication failed');
        }
    };

    return (
        <div>
            {token ? (
                <div>
                    <h2>Authenticated</h2>
                    <p>Token: {token}</p>
                </div>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default AuthComponent;
