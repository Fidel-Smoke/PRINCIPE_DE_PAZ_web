import React from 'react'
import NavbarInicio from '../../components/NavbarInicio'

export default function Index() {
    return (
        <div>
            <NavbarInicio />
            <div className='container mt-5'>
                <h1 className=' text-light mt-5 bebas display-1'>COLEGIO PRINCIPE DE <p>
                    PAZ</p  ></h1>
                <p className='text-light'>Esta es una aplicación de ejemplo para demostrar el uso de React y React Router.</p>

            </div>
            <div className='container mt-5 mb-5'>
                <div>
                    <h2 className='text-start text-light'>
                        SI QUIERES UNA MEJOR EDUCACION <p>
                            NUESTRO COLEGIO ES PARA TI</p>
                    </h2>
                </div>
            </div>

            <div className="">
                {"H"}
            </div>


            <div className="bg-white ">
                <div className="row justify-content-center align-items-center mt-5">
                     <div className="col-md-6 p-5  ">
                    <h1 className='bg-warning text-white bebas'>Nosotros Como Institución</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque inventore molestiae repudiandae! Culpa molestiae quis, omnis ad autem nemo tempore vero, accusantium eveniet dignissimos voluptas, quo ab facere in cupiditate.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus debitis, molestias maxime repudiandae aut vel corporis itaque atque nobis beatae aperiam laborum voluptate cum nemo optio quibusdam expedita. Exercitationem, consequuntur!Lorem
                    </p>
                </div>
                <div className="col-md-6 text-center">
                    <img
                        src="../colegio.jpg"
                        alt="Colegio"
                        className="img-fluid mi-tarjeta shadow"
                        style={{ maxWidth: "55%", height: "auto" }}
                    />
                </div>
                </div>
               
            </div>

            <div className="botones-flotantes">
                <a
                    href="https://wa.me/573001234567"
                    className="whatsapp-flotante"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chatea por WhatsApp"
                >
                    <i className="bi bi-whatsapp"></i>
                    <span className="tooltip-wsp">¡Chatea con nosotros!</span>
                </a>
            </div>









            
            <footer className="bg-light pt-5 pb-3 border-top ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <img src="/principe.png" alt="Logo Colegio" style={{ width: "120px" }} className="mb-3" />
                            <p className="fw-bold mb-1">COLEGIO PRÍNCIPE DE PAZ</p>
                            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                                Educación integral, valores y excelencia académica para el futuro de tus hijos.
                            </p>
                            <div>
                                <a href="#" className="me-2 text-dark"><i className="fab fa-facebook fa-lg"></i></a>
                                <a href="#" className="me-2 text-dark"><i className="fab fa-instagram fa-lg"></i></a>
                                <a href="#" className="text-dark"><i className="fab fa-twitter fa-lg"></i></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h6 className="fw-bold mb-2">Contacto</h6>
                            <p className="mb-1">Calle 123 #45-67<br />Ciudad, País</p>
                            <p className="mb-1">Tel: (123) 456-7890</p>
                            <p className="mb-1">Email: info@colegioprincipepaz.edu</p>
                            <a href="#" className="d-block text-decoration-none text-primary">Contáctanos</a>
                        </div>
                        <div className="col-md-2 mb-4">
                            <h6 className="fw-bold mb-2">Quiénes somos</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-muted text-decoration-none">Nosotros</a></li>
                                <li><a href="#" className="text-muted text-decoration-none">Misión y Visión</a></li>
                                <li><a href="#" className="text-muted text-decoration-none">Equipo</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 mb-4">
                            <h6 className="fw-bold mb-2">Políticas</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-muted text-decoration-none">Política de Privacidad</a></li>
                                <li><a href="#" className="text-muted text-decoration-none">Términos y Condiciones</a></li>
                            </ul>
                        </div>
                        <div className="d-flex gap-3 ">
                            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="./app.png"
                                    alt="Descargar en App Store"
                                    style={{ width: "140px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                                    onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.18)"; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
                                />
                            </a>
                            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="./play.png"
                                    alt="Descargar en Google Play"
                                    style={{ width: "140px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                                    onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.18)"; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8 text-muted small">
                            © {new Date().getFullYear()} Colegio Príncipe de Paz. Todos los derechos reservados.
                        </div>
                        <div className="col-md-4 text-end text-muted small">
                            Diseñado y desarrollado por <a href="#" className="text-decoration-none text-primary">Anonimo</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}
