import React, { useEffect, useState } from 'react';

export default function NavbarInicio() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'bg-blue shadow-sm' : 'bg-transparent'}`}>
            <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

                <a href="/" className="d-flex align-items-center">
                    <img src="/principe.png" alt="Logo Colegio" style={{ width: '60px', height: '60px' }} />
                </a>



                <div className="dropdown">
                    <button
                        className="btn btn-outline-light border-0"
                        type="button"
                        id="menuDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="menuDropdown">
                        <li><a className="dropdown-item" href="#">Inicio</a></li>
                        <li><a className="dropdown-item" href="#">Nosotros</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/Login">Iniciar Sesión</a></li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
