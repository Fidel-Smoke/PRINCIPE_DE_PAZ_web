import React from 'react'
import NavbarInicio from '../../components/NavbarInicio'

export default function Index() {
    return (
        <div>
            <NavbarInicio />
            <div className='container mt-5 index'>
                <h1 className='text-center text-dark'>Bienvenido a la Aplicación</h1>
                <p className='text-center text-secondary'>Esta es una aplicación de ejemplo para demostrar el uso de React y React Router.</p>
            </div>
            <h1 className='text-center text-dark'>HOLA MUNDO</h1>
        </div>
    )
}
