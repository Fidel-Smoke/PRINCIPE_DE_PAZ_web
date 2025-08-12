import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import NavbarCrud from '../../components/NavbarEstudiantil';
import API from '../../api/api';
import Swal from 'sweetalert2';

export default function GestionEstudiantil() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const estudiantesFiltrados = estudiantes.filter(est =>
    (est.nombre_estudiante || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    String(est.documento_estudiante || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (est.curso || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    nombre_estudiante: '',
    documento_estudiante: '',
    curso: '',
    nombre_acudiente: '',
    documento_acudiente: '',
    observaciones: '',
    referencia_pago: '',
    recibo_caja: '',
    meses_pagados: [],
    es_docente: false,
    descuento_pension: 0,
    incluye_carne: true,
    incluye_agenda: true,
    incluye_seguro: true
  });

  const formRef = useRef(null);
  const listaRef = useRef(null);

  const CARNET = 21000;
  const AGENDA = 42000;
  const SEGURO = 31000;

  const COSTOS_2025 = {
    "TR": { matricula: 397000, pension: 268000 },
    "1": { matricula: 397000, pension: 290000 },
    "2": { matricula: 397000, pension: 290000 },
    "3": { matricula: 397000, pension: 290000 },
    "4": { matricula: 397000, pension: 290000 },
    "5": { matricula: 397000, pension: 290000 },
    "6": { matricula: 397000, pension: 301000 },
    "7": { matricula: 397000, pension: 301000 },
    "8": { matricula: 354000, pension: 301000 },
    "9": { matricula: 341000, pension: 301000 },
    "10": { matricula: 341000, pension: 301000 },
    "11": { matricula: 339000, pension: 301000 }
  };

  const mesesDelAno = [
    'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
  ];

  const cargarEstudiantes = async () => {
    try {
      const res = await API.get('/traerEstudiante');
      setEstudiantes(res.data || []);
    } catch (err) {
      console.error(err);
      setEstudiantes([]);
    }
  };

  useEffect(() => { cargarEstudiantes(); }, []);

  useEffect(() => {
    const acceso = sessionStorage.getItem("accesoEstudiantes");
    if (acceso !== "true") {
      window.location.replace("/");
    }
    const handlePopState = () => {
      sessionStorage.removeItem("accesoEstudiantes");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const cursoRaw = (form.curso || '').trim().toUpperCase();
    let grado = 'TR';
    const match = cursoRaw.match(/^\d{1,2}/);
    if (match) {
      grado = match[0];
    } else if (cursoRaw === 'TR') {
      grado = 'TR';
    }
    const costosBase = COSTOS_2025[grado] || { matricula: 0, pension: 0 };

    let pensionFinal = form.es_docente ? costosBase.pension / 2 : costosBase.pension;
    pensionFinal -= pensionFinal * (parseFloat(form.descuento_pension || 0) / 100);

    const valor_carne = form.incluye_carne ? CARNET : 0;
    const valor_agenda = form.incluye_agenda ? AGENDA : 0;
    const valor_seguro = form.incluye_seguro ? SEGURO : 0;

    const totalPagado = Number(costosBase.matricula) + Number(pensionFinal) * (form.meses_pagados?.length || 0);
    const valorEsperado = Number(costosBase.matricula) + Number(pensionFinal) * 10 + valor_carne + valor_agenda + valor_seguro;

    const data = {
      ...form,
      carnet: form.incluye_carne,
      agenda: form.incluye_agenda,
      seguro: form.incluye_seguro,
      valor_matricula: costosBase.matricula,
      valor_pension: pensionFinal,
      valor_carne,
      valor_agenda,
      valor_seguro,
      valor_esperado: valorEsperado,
      valor_pagado: totalPagado
    };

    const repetido = estudiantes.find(est => String(est.documento_estudiante).trim() === String(form.documento_estudiante).trim() && est.id !== form.id);
    if (repetido) {
      Swal.fire("Error", "Ya existe un estudiante con ese documento.", "error");
      return;
    }

    if (!form.nombre_estudiante || !form.documento_estudiante || !form.curso || !form.nombre_acudiente || !form.documento_acudiente) {
      Swal.fire("Campos incompletos", "Por favor, completa todos los campos obligatorios.", "warning");
      return;
    }

    try {
      if (form.id) {
        await API.put(`/actualizarEstudiante/${form.id}`, data);
        Swal.fire({ icon: 'success', title: 'Estudiante actualizado', timer: 2000, showConfirmButton: false });
      } else {
        await API.post('/crearEstudiante', data);
        Swal.fire({ icon: 'success', title: 'Estudiante registrado', timer: 2000, showConfirmButton: false });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Ocurrió un error al guardar.", "error");
    }

    setForm({
      nombre_estudiante: '', documento_estudiante: '', curso: '', nombre_acudiente: '', documento_acudiente: '',
      observaciones: '', referencia_pago: '', recibo_caja: '', meses_pagados: [], es_docente: false,
      descuento_pension: 0, incluye_carne: true, incluye_agenda: true, incluye_seguro: true
    });
    await cargarEstudiantes();
    if (listaRef.current) {
      listaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const editar = est => {
    setForm({
      ...est,
      meses_pagados: (() => {
        try { return JSON.parse(est.meses_pagados || '[]'); } catch { return []; }
      })(),
      es_docente: !!est.es_docente,
      descuento_pension: parseFloat(est.descuento_pension || 0),
      recibo_caja: est.recibo_caja || '',
      incluye_carne:
        est.carnet === 1 || est.carnet === true || est.carnet === "1" ||
        est.incluye_carne === true || est.incluye_carne === 1 || est.incluye_carne === "1",
      incluye_agenda:
        est.agenda === 1 || est.agenda === true || est.agenda === "1" ||
        est.incluye_agenda === true || est.incluye_agenda === 1 || est.incluye_agenda === "1",
      incluye_seguro:
        est.seguro === 1 || est.seguro === true || est.seguro === "1" ||
        est.incluye_seguro === true || est.incluye_seguro === 1 || est.incluye_seguro === "1"
    });
    setMostrarFormulario(true);
    window.scrollTo(0, 0);
  };

  const eliminar = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar este estudiante?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/eliminarEstudiante/${id}`);
        cargarEstudiantes();
        Swal.fire({ icon: 'success', title: 'Estudiante eliminado', timer: 2000, showConfirmButton: false });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo eliminar.", "error");
      }
    }
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(estudiantes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'estudiantes.xlsx');
    Swal.fire({ icon: 'success', title: 'Exportado correctamente', text: 'El archivo Excel ha sido generado.', timer: 2000, showConfirmButton: false });
  };

  return (
    <div className="container py-4">
      <NavbarCrud />
      <div className="mt-5 pt-4">

        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-4 mt-4">
          <input
            type="text"
            className="form-control search-input"
            placeholder="🔍 Buscar por nombre, documento, curso..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-success" onClick={exportarExcel}>
              📤 Exportar A Excel
            </button>

            <button
              className={`btn ${mostrarFormulario ? 'btn-outline-light' : 'btn-primary'}`}
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
              {mostrarFormulario ? "Cerrar Registro" : "Registrar Estudiante"}
            </button>
          </div>
        </div>

        {mostrarFormulario && (
          <form ref={formRef} onSubmit={handleSubmit} className="card p-4 mb-4 form-modern shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">📘 Gestión De Estudiantes</h3>
              <small className="text-muted">Colegio Príncipe de Paz</small>
            </div>

            <div className="row g-3">
              {[
                ['nombre_estudiante', 'Nombre estudiante'],
                ['documento_estudiante', 'Documento'],
                ['curso', 'Curso'],
                ['nombre_acudiente', 'Nombre acudiente'],
                ['documento_acudiente', 'Documento acudiente'],
                ['referencia_pago', 'Referencia de pago'],
                ['recibo_caja', 'R.C. (Recibo de Caja)'],
                ['observaciones', 'Observaciones']
              ].map(([name, placeholder]) => (
                <div className="col-12 col-md-6" key={name}>
                  <input
                    className="form-control"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div className="col-12 col-md-4">
                <label className="form-label mb-1">Descuento pensión (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.descuento_pension}
                  name="descuento_pension"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-8 d-flex align-items-center gap-3 flex-wrap">
                <label className="form-check mb-0">
                  <input className="form-check-input me-1" type="checkbox" name="es_docente" checked={form.es_docente} onChange={handleChange} />
                  Docente
                </label>
                <label className="form-check mb-0">
                  <input className="form-check-input me-1" type="checkbox" name="incluye_carne" checked={form.incluye_carne} onChange={handleChange} />
                  Incluir Carnet
                </label>
                <label className="form-check mb-0">
                  <input className="form-check-input me-1" type="checkbox" name="incluye_agenda" checked={form.incluye_agenda} onChange={handleChange} />
                  Incluir Agenda
                </label>
                <label className="form-check mb-0">
                  <input className="form-check-input me-1" type="checkbox" name="incluye_seguro" checked={form.incluye_seguro} onChange={handleChange} />
                  Incluir Seguro
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">Selecciona los meses pagados:</label>
                <div className="row">
                  {mesesDelAno.map(mes => (
                    <div className="col-6 col-md-3" key={mes}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={mes}
                          id={`mes-${mes}`}
                          checked={form.meses_pagados.includes(mes)}
                          onChange={e => {
                            const checked = e.target.checked;
                            const updated = checked
                              ? [...form.meses_pagados, mes]
                              : form.meses_pagados.filter(m => m !== mes);
                            setForm({ ...form, meses_pagados: updated });
                          }}
                        />
                        <label className="form-check-label" htmlFor={`mes-${mes}`}>
                          {mes}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-between align-items-center">
              <div>
                {form.id ? <span className="badge bg-info">Editando a: {form.nombre_estudiante} ({form.documento_estudiante})</span> : null}
              </div>
              <div>
                <button type="submit" className="btn btn-primary me-2">{form.id ? 'Actualizar' : 'Registrar'}</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => {
                  setMostrarFormulario(false);
                  setForm({
                    nombre_estudiante: '', documento_estudiante: '', curso: '', nombre_acudiente: '', documento_acudiente: '',
                    observaciones: '', referencia_pago: '', recibo_caja: '', meses_pagados: [], es_docente: false,
                    descuento_pension: 0, incluye_carne: true, incluye_agenda: true, incluye_seguro: true
                  });
                }}>Cancelar</button>
              </div>
            </div>
          </form>
        )}

        <div ref={listaRef} className="mt-5 pt-5">
          <h2 className="text-center mb-4 text-white display-5 fw-bold">🎓 Estudiantes Registrados</h2>

          {estudiantesFiltrados.length === 0 ? (
            <div className="alert alert-warning text-center">No hay resultados para esa búsqueda.</div>
          ) : (
            estudiantesFiltrados.map(est => {
              let meses = [];
              try { meses = JSON.parse(est.meses_pagados || '[]'); } catch { meses = []; }
              meses = meses.filter(m => typeof m === 'string' && m.trim() !== '');

              const valorMatricula = Number(est.valor_matricula || 0);
              const valorPension = Number(est.valor_pension || 0);
              const valorCarne = Number(est.valor_carne || 0);
              const valorAgenda = Number(est.valor_agenda || 0);
              const valorSeguro = Number(est.valor_seguro || 0);
              const total = valorMatricula + valorPension * meses.length + valorCarne + valorAgenda + valorSeguro;
              const valorEsperado = Number(est.valor_esperado || 0);
              const deuda = valorEsperado - total;

              const pagoMatricula = valorMatricula > 0;
              const pagoPensiones = meses.length > 0;
              const pagoCarnet = valorCarne > 0;
              const pagoAgenda = valorAgenda > 0;
              const pagoSeguro = valorSeguro > 0;

              const mesesPagadosSet = new Set(meses);
              const mesesFaltantes = mesesDelAno.filter(m => !mesesPagadosSet.has(m));
              const todosFaltan = meses.length === 0;
              const ningunoFalta = mesesFaltantes.length === 0;

              const isDocente = est.es_docente === 1 || est.es_docente === "1" || est.es_docente === true;

              const percentPaid = valorEsperado > 0 ? Math.round((total / valorEsperado) * 100) : 0;

              return (
                <div key={est.id} className={`card mb-4 mt-5 student-card border-${deuda > 0 ? 'danger' : 'success'}`}>
                  <div className="card-header bg-gradient-primary text-white d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">{est.nombre_estudiante} <small className="badge bg-light text-dark ms-2">{est.curso || '-'}</small></h5>
                      <small className="text-white">Doc: {est.documento_estudiante || '-'}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="small text-white">ID: {est.id || '-'}</div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="mb-3"><strong>Acudiente:</strong> {est.nombre_acudiente || '-'} <span className="text-muted ms-2">Doc: {est.documento_acudiente || '-'}</span></div>

                        <div className="row row-cols-2 row-cols-md-3 g-3 mb-3 metrics-row">
                          <div className="col">
                            <div className="metric-card p-2 text-center">
                              <small className="d-block">Matrícula</small>
                              <strong>${Number(valorMatricula).toLocaleString('es-CO')}</strong>
                            </div>
                          </div>
                          <div className="col">
                            <div className="metric-card p-2 text-center">
                              <small className="d-block">Pensión</small>
                              <strong>${Number(valorPension).toLocaleString('es-CO')}</strong>
                              {parseFloat(est.descuento_pension) > 0 && (
                                <div><span className="badge bg-info mt-1">Descuento {parseFloat(est.descuento_pension)}%</span></div>
                              )}
                              {isDocente && <span className="badge bg-info text-white">👨‍🏫 Hijo De Trabajador</span>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="metric-card p-2 text-center">
                              <small className="d-block">Carnet</small>
                              {pagoCarnet ? <strong>${Number(valorCarne).toLocaleString('es-CO')}</strong> : <span className="badge bg-danger">Debe Carnet</span>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="metric-card p-2 text-center">
                              <small className="d-block">Agenda</small>
                              {pagoAgenda ? <strong>${Number(valorAgenda).toLocaleString('es-CO')}</strong> : <span className="badge bg-danger">Debe Agenda</span>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="metric-card p-2 text-center">
                              <small className="d-block">Seguro</small>
                              {pagoSeguro ? <strong>${Number(valorSeguro).toLocaleString('es-CO')}</strong> : <span className="bg-warning badge text-white">No optó</span>}
                            </div>
                          </div>
                          <div className="col">
                            <div className="metric-card p-2 text-center">
                              <small className="d-block">Meses pagados</small>
                              {meses.length > 0 ? meses.map((m, i) => <span key={i} className="badge bg-secondary me-1 mb-1">{m}</span>) : '-'}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <small className="text-muted">Meses que faltan por pagar:</small><br />
                          {valorEsperado === 0
                            ? <span className="badge bg-secondary">Sin valor esperado</span>
                            : deuda === 0
                              ? <span className="badge bg-success">Al día</span>
                              : ningunoFalta
                                ? <span className="badge bg-success">No debe meses</span>
                                : todosFaltan
                                  ? mesesDelAno.map((m, i) => <span key={i} className="badge bg-danger me-1">{m}</span>)
                                  : mesesFaltantes.map((m, i) => <span key={i} className="badge bg-danger me-1">{m}</span>)
                          }
                        </div>

                        <div>
                          <small className="text-muted">Pagos realizados:</small><br />
                          {pagoMatricula && <span className="badge bg-success me-1">✔ Matrícula</span>}
                          {pagoCarnet && <span className="badge bg-success me-1">✔ Carnet</span>}
                          {pagoAgenda && <span className="badge bg-success me-1">✔ Agenda</span>}
                          {pagoSeguro && <span className="badge bg-success me-1">✔ Seguro</span>}
                          {pagoPensiones && <span className="badge bg-primary me-1">✔ Pensiones</span>}
                          {!pagoMatricula && !pagoPensiones && <span className="badge bg-warning text-dark">⚠️ Sin pagos registrados</span>}
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="totals-card p-3 mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <small className="text-muted d-block">Total Pagado</small>
                              <div className="h5 text-success mb-0">${total.toLocaleString('es-CO')}</div>
                            </div>
                            <div>
                              <small className="text-muted d-block">Deuda</small>
                              <div className={`h5 mb-0 ${deuda > 0 ? 'text-danger fw-bold' : 'text-success'}`}>${deuda.toLocaleString('es-CO')}</div>
                            </div>
                          </div>

                          <div className="mb-2">
                            <small className="text-muted">Progreso de pago</small>
                            <div className="progress progress-animated" style={{ height: '20px' }}>
                              <div
                                className={`progress-bar d-flex align-items-center justify-content-center fw-bold ${percentPaid < 20
                                  ? 'bg-danger'
                                  : percentPaid < 80
                                    ? 'bg-info'
                                    : 'bg-success'
                                  }`}
                                role="progressbar"
                                style={{
                                  width: `${Math.min(percentPaid, 100)}%`,
                                  transition: 'width 0.8s ease-in-out'
                                }}
                                aria-valuenow={percentPaid}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {percentPaid}%
                              </div>
                            </div>
                          </div>

                          <div className="d-flex gap-2 justify-content-end mt-3">
                            <button className="btn btn-warning btn-action" onClick={() => editar(est)} title="Editar">✏️</button>
                            <button className="btn btn-danger btn-action" onClick={() => eliminar(est.id)} title="Eliminar">🗑️</button>
                          </div>
                        </div>

                        <div className="text-muted small"><strong>Referencia:</strong> {est.referencia_pago || '-'}<br />
                          <strong>R.C.:</strong> {est.recibo_caja || '-'}<br />
                          <strong>Obs:</strong> {est.observaciones || 'Sin Observaciones'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}