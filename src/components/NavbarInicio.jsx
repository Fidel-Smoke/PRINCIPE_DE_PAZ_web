import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function NavbarInicio() {
    const [scrolled, setScrolled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleAccess = () => {
        if (password === 'cpp_2025*') {
            sessionStorage.setItem("accesoEstudiantes", "true");
            Swal.fire({
                title: 'Acceso concedido',
                text: 'Bienvenido a la sección de gestión estudiantil',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = "/GestionEstudiantil";
            });
        } else {
            Swal.fire({
                title: 'Acceso denegado',
                text: 'La contraseña ingresada es incorrecta',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };


    return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'bg-white shadow' : 'bg-transparent'}`}>
                <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
                    <a href="/" className="d-flex align-items-center">
                        <img src="/principe.png" alt="Logo Colegio" style={{ width: '120px', height: '70px' }} />
                    </a>

                    <div className="dropdown">
                        <button
                            className={`btn border-0 ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'}`}
                            type="button"
                            id="menuDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-list fs-3"></i>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
                            <li><a className="dropdown-item" href="#">Inicio</a></li>
                            <li><a className="dropdown-item" href="#">Nosotros</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item" onClick={() => setShowModal(true)}>Estudiantes</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Acceso Restringido</h5>
                                <button type="button" className="btn-close" onClick={() => {
                                    setShowModal(false);
                                    setPassword('');
                                }}></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="passwordInput">Ingrese la contraseña:</label>
                                <input
                                    id="passwordInput"
                                    type="password"
                                    className="form-control mt-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => {
                                    setShowModal(false);
                                    setPassword('');
                                }}>Cancelar</button>
                                <button className="btn btn-primary" onClick={handleAccess}>Acceder</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
