import React, { useEffect, useState } from 'react';

export default function NavbarCrud() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const hadleCerrarSesion = () => {
        sessionStorage.removeItem("accesoEstudiantes");
        window.location.href = "/";
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'bg-white shadow' : 'bg-transparent'}`}>
            <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

                <a href="/GestionEstudiantil" className="d-flex align-items-center">
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

                    <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="menuDropdown">
                        <li className='hover-link'><a className="dropdown-item" href="#">Inicio</a></li>
                        <li className='hover-link'><a className="dropdown-item" href="/" onClick={hadleCerrarSesion}>Cerrar Sesión</a></li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
