import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Registro() {


    const [user, setUser] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
    });


    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/registro", user);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Cuenta creada',
                    text: 'Cuenta creada correctamente',
                    icon: 'success',
                    iconColor: "#1bf30b",
                    confirmButtonColor: "#DC3545",
                    confirmButtonText: 'Continuar',
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                });
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    title: error.response.data || 'Credenciales incorrectas',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo',
                    cuestomClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    }
                });
            }
        }
    }


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">

                {/* Nombre */}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="user_name"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="user_email"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="user_password"
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Registrarse
                </button>
            </form>
        </div>
    );
}
