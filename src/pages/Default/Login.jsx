import React from 'react'
import { useState } from 'react';

export default function Login() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user === 'admin' && pass === '1234') {
            setMsg('¡Bienvenido!');
        } else {
            setMsg('Usuario o contraseña incorrectos');
        }
        console.log(`Usuario: ${user}, Contraseña: ${pass}`);
        setUser('');
        setPass('');
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
                {msg && <p>{msg}</p>}
                <a href="/registro" className='text-decoration-none text-center'>Registrarme</a>
            </form>
        </div>
    );
}
