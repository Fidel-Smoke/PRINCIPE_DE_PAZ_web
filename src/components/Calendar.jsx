import React from 'react';

export default function Calendar() {
    const calendario = [
        { mes: "Enero", eventos: ["15 al 19: Inscripciones y matrículas", "22: Inicio de clases"] },
        { mes: "Febrero", eventos: ["5: Izada de bandera - Respeto", "14: Día de la Amistad"] },
        { mes: "Marzo", eventos: ["18 al 22: Evaluaciones I", "25 al 29: Entrega de boletines"] },
        { mes: "Abril", eventos: ["1 al 5: Semana Santa (receso)", "22: Taller de padres – ciclo 1"] },
        { mes: "Mayo", eventos: ["9: Feria de ciencias", "27 al 31: Evaluaciones II"] },
        { mes: "Junio", eventos: ["3 al 7: Entrega de informes", "10 al 28: Vacaciones mitad de año"] },
        { mes: "Julio", eventos: ["15: Reinicio de clases", "29: Actividad deportiva"] },
        { mes: "Agosto", eventos: ["12 al 16: Semana cultural", "23: Reunión de padres"] },
        { mes: "Septiembre", eventos: ["9: Día del estudiante", "20: Izada de bandera"] },
        { mes: "Octubre", eventos: ["7 al 11: Evaluaciones III", "31: Fiesta de integración"] },
        { mes: "Noviembre", eventos: ["4 al 8: Entrega de boletines", "15: Clausura académica"] },
        { mes: "Diciembre", eventos: ["1 al 15: Receso administrativo", "🎄 Felices fiestas"] },
    ];

    return (
        <div
        >
            <div className="container text-white">
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-5 text-dark mt-5">
                        <span role="img" aria-label="calendar">📅</span> Calendario Académico 2025
                    </h2>
                    <p className="text-muted">Consulta aquí las fechas clave del año escolar</p>
                </div>

                <div className="accordion rounded-3 overflow-hidden shadow-lg bg-white text-dark" id="calendarioAccordion">
                    {calendario.map((item, index) => {
                        const headingId = `heading-${index}`;
                        const collapseId = `collapse-${index}`;
                        return (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={headingId}>
                                    <button
                                        className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${collapseId}`}
                                        aria-expanded={index === 0 ? 'true' : 'false'}
                                        aria-controls={collapseId}
                                    >
                                        {item.mes}
                                    </button>
                                </h2>
                                <div
                                    id={collapseId}
                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                    aria-labelledby={headingId}
                                    data-bs-parent="#calendarioAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-unstyled mb-0">
                                            {item.eventos.map((evento, i) => (
                                                <li key={i} className="mb-2">📌 {evento}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-4">
                    <p className="text-light small">Para más información, contacta a la administración.</p>
                </div>
            </div>
        </div>
    );
}
