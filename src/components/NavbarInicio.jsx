import React, { useState, useEffect } from 'react';




export default function NavbarInicio() {

    return (

        <div className='navbar navbar-expand-lg navbar-light bg-info sticky-top'>
            <div className="container">
                <a href="/" className="anton"><img src="principe.png" alt="" width="100" height="60" className="hover-effect" /></a>
                <p className='text-white mt-4'>Es un placer para nosotros que estés aquí</p>

                <div className="dropstart mx-0">
                    <a className="btn btn-info dropdown hover-effect border border border-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-list text-white  "></i>
                    </a>
                    <ul className="dropdown-menu bg-dark">
                        <li><a className="dropdown-item text-white" href="#">Action</a></li>
                        <li><a className="dropdown-item text-white" href="#">Another action</a>
                            <hr className='text-white' />
                        </li>
                        <li>
                            <a className="dropdown-item text-white" href="../Login">Iniciar Sesion</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
}