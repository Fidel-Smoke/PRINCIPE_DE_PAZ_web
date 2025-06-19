import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Login() {
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/login', { user_email, user_password });

            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                console.log(user);
                Swal.fire({
                    title: "Iniciaste sesión",
                    text: "Has iniciado sesión correctamente",
                    icon: "success",
                    iconColor: "#1bf30b",
                    confirmButtonColor: "#DC3545",
                    confirmButtonText: "Continuar",
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                });
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    title: error.response.data.error || 'Credenciales incorrectas',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            } else if (error.request) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al procesar tu solicitud.',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    name='user_email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    value={user_password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className=" bg-white border rounded-end"
                >
                    {isPasswordVisible ? " 🙉" : "🙈"}
                </button>
                <button type="submit">Entrar</button>
                <a href="/registro" className='text-decoration-none text-center'>Registrarme</a>
            </form>
        </div>
    );
}
