import React from 'react'
import NavbarInicio from '../../components/NavbarInicio'
import { useState, useEffect } from 'react';
import Calendar from '../../components/Calendar';
import { MdGradient } from 'react-icons/md';


export default function Index() {
    const [niveles, setNiveles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flipped, setFlipped] = useState([false, false, false]);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [nivelSeleccionado, setNivelSeleccionado] = useState('');
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');



    useEffect(() => {
        setTimeout(() => {
            setNiveles([
                {
                    titulo: "BASICA PRIMARIA",
                    frente: "Formación integral con juegos y valores.",
                    reverso: "Desarrollo emocional, lenguaje y motricidad.",
                    imagen: "./niños2.jpg"
                },
                {
                    titulo: "BASICA SECUNDARIA",
                    frente: "Lectoescritura, matemáticas y ciencia.",
                    reverso: "Consolidación académica y desarrollo del pensamiento.",
                    imagen: "./pri.jpg"
                },
                {
                    titulo: "MEDIA",
                    frente: "Desarrollo crítico, liderazgo y vocación.",
                    reverso: "Preparación para pruebas Saber y orientación profesional.",
                    imagen: "./principe.png"
                }
            ]);
            setLoading(false);
        }, 2000);
    }, []);

    const toggleFlip = (index) => {
        setFlipped(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };
    return (
        <div>
            <NavbarInicio />
            <div className="mt-5 pt-5">
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
            </div>
            

       <p>a</p> 
        <p>a</p>

            <div className="bg-white">
                <div className="row justify-content-center align-items-center mt-5 mx-1">
                    <div className="col-md-6 p-5">
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
                <div className='container mt-5 pt-5 text-center'>
                    <h1 className='text-white bg-warning fw-bold mb-4 bebas display-5'>Nuestras Ofertas Académicas</h1>
                    <p>Para nosotros es un gusto que seas parte de nuestra comunidad, postulate ahora y conoce nuestras ofertas académicas</p>
                    <div className='container'>
                        <div className='row g-4 mt-3'>
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <div className="col-md-4 mb-5" key={i}>
                                        <div className="card" aria-hidden="true">
                                            <div className="text-center m-3">
                                                <div className="spinner-border text-info" role="status"></div>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title placeholder-glow">
                                                    <span className="placeholder col-6"></span>
                                                </h5>
                                                <p className="card-text placeholder-glow">
                                                    <span className="placeholder col-7"></span>
                                                    <span className="placeholder col-4"></span>
                                                </p>
                                                <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                niveles.map((nivel, i) => (
                                    <div className='col-md-4 mb-5' key={i}>
                                        <div className='card-container hover-effect' onClick={() => toggleFlip(i)} style={{ height: "260px", cursor: "pointer" }}>
                                            <div className={`card-inner ${flipped[i] ? 'flipped' : ''} shadow`}>
                                                <div className='card-front d-flex flex-column justify-content-center align-items-center p-3 bg-white'>
                                                    <img
                                                        src={nivel.imagen}
                                                        alt={nivel.titulo}
                                                        style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }}
                                                    />
                                                    <h5 className='card-title text-primary'>{nivel.titulo}</h5>
                                                    <p className='card-text text-center'>{nivel.frente}</p>
                                                </div>

                                                <div className='card-back d-flex flex-column justify-content-center align-items-center text-dark text-center px-3'>
                                                    <h5>{nivel.titulo}</h5>
                                                    <p>{nivel.reverso}</p>
                                                    <a className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Postularme
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {!loading && (
                            <div className="">
                                <h5 className="text-white bg-warning mb-3 fw-bold bebas fs-1">Grados Impartidos</h5>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    {[
                                        'PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO',
                                        'SEXTO', 'SÉPTIMO', 'OCTAVO', 'NOVENO', 'DÉCIMO', 'ONCE'
                                    ].map((grado, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-secondary fs-6 p-2 px-3 rounded-pill shadow hover-effect mt-3" style={{ cursor: "pointer" }}
                                        >
                                            {grado}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="container my-5 py-5">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
                                <h1 className="fw-bold">¿Cuál es nuestro calendario académico?</h1>
                                <i className="bi bi-arrow-right display-3 mt-3 text-primary flecha-rebote" style={{ transition: 'transform 0.3s' }}></i>
                            </div>

                            <div className="col-md-6">
                                <div className="bg-light p-5 rounded-4 shadow text-center">
                                    <button
                                        className="btn btn-gradient-primary px-4 py-2 fs-5 fw-semibold"
                                        style={{
                                            background: 'linear-gradient(45deg, #0d6efd, #66b2ff)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                        onClick={() => setMostrarCalendario(prev => !prev)}
                                    >
                                        {mostrarCalendario ? "Ocultar calendario" : "Ver calendario académico"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {mostrarCalendario && (
                            <div className="mt-5">
                                <Calendar />
                            </div>
                        )}
                    </div>



                    {/* MODAL POSTUALRME */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form>
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body px-4">
                                        <p className='text-muted'>Al postularte recibiras una llamada para recibir toda la información necesaria</p>
                                        <div className="mb-3 d-flex align-items-center">
                                            
                                            <label htmlFor="input-nombre" className="col-4 col-form-label fw-semibold text-end pe-3">Nombre:</label>
                                            <div className="col-8">
                                                <input
                                                    required
                                                    type="text"
                                                    id="input-nombre"
                                                    className="form-control"
                                                    placeholder="Nombre de la persona que se va a postular"
                                                    pattern="^[A-Za-z\s]+$"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 d-flex align-items-center">
                                            <label htmlFor="input-contacto" className="col-4 col-form-label fw-semibold text-end pe-3">Número de contacto:</label>
                                            <div className="col-8">
                                                <input
                                                    required
                                                    type="tel"
                                                    id="input-contacto"
                                                    className="form-control"
                                                    placeholder="Número de contacto"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 d-flex align-items-center">
                                            <label htmlFor="input-nivel" className="col-5 col-form-label fw-semibold text-start">Deseo postularme a:</label>
                                            <select
                                                id="input-nivel"
                                                name="id_categoria_producto"
                                                className="form-select"
                                                value={nivelSeleccionado}
                                                onChange={(e) => {
                                                    setNivelSeleccionado(e.target.value);
                                                    setCursoSeleccionado('');
                                                }}
                                                required
                                            >
                                                <option value="" disabled>Seleccione una opción</option>
                                                <option value="primaria">BÁSICA PRIMARIA</option>
                                                <option value="secundaria">BÁSICA SECUNDARIA</option>
                                                <option value="media">MEDIA</option>
                                            </select>
                                        </div>

                                        {nivelSeleccionado && (
                                            <div className="mb-3 d-flex align-items-center">
                                                <label htmlFor="input-curso" className="col-5 col-form-label fw-semibold text-start">Seleccione el curso:</label>
                                                <select
                                                    id="input-curso"
                                                    name="curso"
                                                    className="form-select"
                                                    value={cursoSeleccionado}
                                                    onChange={(e) => setCursoSeleccionado(e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Seleccione un curso</option>
                                                    {nivelSeleccionado === 'primaria' &&
                                                        ['1º', '2º', '3º', '4º', '5º'].map(curso => (
                                                            <option key={curso} value={curso}>{curso}</option>
                                                        ))
                                                    }
                                                    {nivelSeleccionado === 'secundaria' &&
                                                        ['6º', '7º', '8º', '9º'].map(curso => (
                                                            <option key={curso} value={curso}>{curso}</option>
                                                        ))
                                                    }
                                                    {nivelSeleccionado === 'media' &&
                                                        ['10º', '11º'].map(curso => (
                                                            <option key={curso} value={curso}>{curso}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        )}
                                    </div>


                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-info text-white">Postularme</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/*FIN MODAL POSTUALRME */}
                </div>

                <hr className='text-dark w-75 mx-auto' style={{ marginTop: "100px" }} />

                <div className="container mt-3 pt-5 py-5">
                    <h1 className='text-center mb-5 fw-bold bebas'>¿DÓNDE NOS ENCUENTRAS?</h1>
                    <div className="row align-items-center gy-4 mt-5 ">
                        <div className="col-md-6">
                            <div className="ratio ratio-16x9 rounded-4 shadow">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.2412244277457!2d-74.0946944!3d4.5505659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f989e9ce6af3b%3A0x6797def67b0a07a9!2sColegio%20Pr%C3%ADncipe%20De%20Paz!5e0!3m2!1ses!2sco!4v1750259317644!5m2!1ses!2sco"
                                    className="border rounded-4"
                                    loading="lazy"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="col-md-6 text-center">
                            <h2 className='fw-bold'>¡Visítanos para tener el gusto de atenderte!</h2>
                            <p className="text-muted mt-3">
                                Estamos ubicados en Bogotá, comprometidos con la formación integral de nuestros estudiantes.
                            </p>
                        </div>
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









            <div className="bg-light">
                <footer className=" pt-5 pb-3 border-top mx-auto">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <img src="/principe.png" alt="Logo Colegio" style={{ width: "120px" }} className="mb-3" />
                                <p className="fw-bold mb-1">COLEGIO PRÍNCIPE DE PAZ</p>
                                <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                                    Educación integral, valores y excelencia académica para el futuro de tus hijos.
                                </p>
                            </div>
                            <div className="col-md-3 mb-4">
                                <h6 className="fw-bold mb-2">Contacto</h6>
                                <p className="mb-1">Cra. 3a Este #41 Sur-52 a, Cl. 41 Sur #2<br />Bogotá, Colombia</p>
                                <p className="mb-1">Tel: (123) 456-7890</p>
                                <p className="mb-1">Email: info@colegioprincipepaz.edu</p>
                                <p className="d-block text-primary">Para quejas y reclamos</p>
                            </div>
                            <div className="col-md-2 mb-4">
                                <h6 className="fw-bold mb-2">Quiénes somos</h6>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-muted text-decoration-none">Nosotros</a></li>
                                    <li><a href="#" className="text-muted text-decoration-none">Misión y Visión</a></li>
                                    <li><a href="#" className="text-muted text-decoration-none">Valores</a></li>
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

        </div>

    )
}
