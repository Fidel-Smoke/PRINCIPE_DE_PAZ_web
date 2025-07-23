import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function Crud() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [form, setForm] = useState({
    nombre_estudiante: '',
    documento_estudiante: '',
    curso: '',
    nombre_acudiente: '',
    documento_acudiente: '',
    observaciones: '',
    referencia_pago: '',
    meses_pagados: [],
    es_docente: false
  });

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
    const res = await axios.get('http://localhost:8080/traerEstudiante');
    setEstudiantes(res.data);
  };

  useEffect(() => { cargarEstudiantes(); }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const cursoRaw = form.curso.trim().toUpperCase();
    const grado = cursoRaw.replace(/\D/g, '') || 'TR';
    const costosBase = COSTOS_2025[grado] || { matricula: 0, pension: 0 };
    const pensionFinal = form.es_docente ? Math.floor(costosBase.pension / 2) : costosBase.pension;
    const totalPagado = costosBase.matricula + pensionFinal * form.meses_pagados.length + CARNET + AGENDA + SEGURO;
    const valorEsperado = costosBase.matricula + pensionFinal * 10 + CARNET + AGENDA + SEGURO;

    const data = {
      ...form,
      valor_matricula: costosBase.matricula,
      valor_pension: pensionFinal,
      valor_carne: CARNET,
      valor_agenda: AGENDA,
      valor_seguro: SEGURO,
      total_pagado: totalPagado,
      valor_esperado: valorEsperado,
      deuda: valorEsperado - totalPagado,
      meses_pagados: JSON.stringify(form.meses_pagados)
    };

    const repetido = estudiantes.find(est =>
      est.documento_estudiante === form.documento_estudiante && est.id !== form.id
    );
    if (repetido) {
      alert('Ya existe un estudiante con ese documento.');
      return;
    }

    if (form.id) {
      await axios.put(`http://localhost:8080/actualizarEstudiante/${form.id}`, data);
    } else {
      await axios.post('http://localhost:8080/crearEstudiante', data);
    }

    setForm({
      nombre_estudiante: '', documento_estudiante: '', curso: '',
      nombre_acudiente: '', documento_acudiente: '', observaciones: '',
      referencia_pago: '', meses_pagados: [], es_docente: false
    });
    cargarEstudiantes();
  };

  const editar = est => {
    setForm({
      ...est,
      meses_pagados: JSON.parse(est.meses_pagados || '[]'),
      es_docente: !!est.es_docente
    });
  };

  const eliminar = async id => {
    if (window.confirm('¿Eliminar este estudiante?')) {
      await axios.delete(`http://localhost:8080/eliminarEstudiante/${id}`);
      cargarEstudiantes();
    }
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(estudiantes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'estudiantes.xlsx');
  };

  const estudiantesFiltrados = busqueda.trim() === ''
    ? estudiantes
    : estudiantes.filter(est => {
      const busq = busqueda.toLowerCase();
      return (
        est.nombre_estudiante.toLowerCase().includes(busq) ||
        est.documento_estudiante.toLowerCase().includes(busq) ||
        est.nombre_acudiente.toLowerCase().includes(busq) ||
        est.curso.toLowerCase().includes(busq)
      );
    });

  return (
    <div className="container py-4 ">
      <h2 className="text-center text-white fw-bold mb-4 fs-1">📘 Gestión De Estudiantes - Colegio Príncipe de Paz</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
        <div className="row g-3">
          {[['nombre_estudiante', 'Nombre estudiante'], ['documento_estudiante', 'Documento'],
          ['curso', 'Curso'], ['nombre_acudiente', 'Nombre acudiente'],
          ['documento_acudiente', 'Documento acudiente'], ['referencia_pago', 'Referencia pago'], ['observaciones', 'Observaciones']
          ].map(([name, placeholder]) => (
            <div className="col-md-6" key={name}>
              <input
                className="form-control"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={name !== 'observaciones' && name !== 'referencia_pago'}
              />
            </div>
          ))}

          <div className="col-md-6">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="es_docente" id="es_docente" checked={form.es_docente} onChange={handleChange} />
              <label className="form-check-label " htmlFor="es_docente" style={{ cursor: 'pointer' }}>👨‍🏫Marque Aqui Si El Acudiente Es Docente</label>
            </div>
          </div>

          <div className="col-md-12">
            <label className="form-label">Selecciona Los Meses Pagados:</label>
            <div className="row">
              {mesesDelAno.map(mes => (
                <div className="col-md-3" key={mes}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      style={{ cursor: 'pointer' }}
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
                    <label className="form-check-label" htmlFor={`mes-${mes}`}>{mes}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">{form.id ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" className="btn btn-success" onClick={exportarExcel}>📤 Exportar a Excel</button>
        </div>
      </form>

      <div className="container py-3">
        <h2 className="text-center text-white fw-bold mb-4 fs-2">🎓 Estudiantes Registrados</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Buscar por nombre, documento, curso..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {estudiantesFiltrados.map(est => {
          let meses = [];
          try {
            meses = JSON.parse(est.meses_pagados || '[]');
          } catch { }
          meses = meses.filter(m => typeof m === 'string' && m.trim() !== '');

          const total = parseInt(est.valor_matricula || 0) +
            parseInt(est.valor_pension || 0) * meses.length +
            parseInt(est.valor_carne || 0) +
            parseInt(est.valor_agenda || 0) +
            parseInt(est.valor_seguro || 0);

          const deuda = parseInt(est.valor_esperado || 0) - total;

          const pagoMatricula = parseInt(est.valor_matricula || 0) > 0;
          const pagoPensiones = meses.length > 0;

          // Calcular meses faltantes por pagar
          const mesesPagadosSet = new Set(meses);
          const mesesFaltantes = mesesDelAno.filter(m => !mesesPagadosSet.has(m));
          const todosFaltan = meses.length === 0;
          const ningunoFalta = mesesFaltantes.length === 0;

          return (
            <div key={est.id} className={`card shadow-sm mb-4 border-${deuda > 0 ? 'danger' : 'success'}`}>
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                  <div>
                    <h5 className="card-title fw-bold mb-1">
                      Estudiante: {est.nombre_estudiante} {est.es_docente === 1 && <span className="badge bg-info">👨‍🏫</span>}
                    </h5>
                    <div className="text-muted" style={{ fontSize: '0.95em' }}>
                      <span className="me-3"><strong>Doc. Estudiante:</strong> {est.documento_estudiante}</span>
                      <span className="me-3"><strong>Curso:</strong> {est.curso}</span>

                    </div>
                  </div>

                </div>
                <div className="mt-2 ">
                  <h5 className="fw-bold">Acudiente: {est.nombre_acudiente}</h5>
                </div>
                <span className=" text-muted"><strong>Doc. Acudiente:</strong> {est.documento_acudiente}</span>
                <span className='ms-4 text-muted'>
                  <strong>Referencia:</strong>
                  {est.referencia_pago
                    ? <span className="badge text-dark ms-1">{est.referencia_pago}</span>
                    : <span className="text-muted ms-1">-</span>
                  }
                </span>


                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 text-center mt-4">
                  <div><small>Matrícula:</small><br /><strong>${parseInt(est.valor_matricula).toLocaleString('es-CO')}</strong></div>
                  <div><small>Pensión:</small><br /><strong>${parseInt(est.valor_pension).toLocaleString('es-CO')}</strong></div>
                  <div><small>Carné:</small><br /><strong>${parseInt(est.valor_carne).toLocaleString('es-CO')}</strong></div>
                  <div><small>Agenda:</small><br /><strong>${parseInt(est.valor_agenda).toLocaleString('es-CO')}</strong></div>
                  <div><small>Seguro:</small><br /><strong>${parseInt(est.valor_seguro).toLocaleString('es-CO')}</strong></div>
                  <div><small>Meses pagados:</small><br />{meses.length > 0 ? meses.map((m, i) => <span key={i} className="badge bg-secondary me-1">{m}</span>) : '-'}</div>
                </div>

                {/* NUEVO: Meses faltantes por pagar */}
                <div className="mt-3">
                  <small className="text-muted">Meses que faltan por pagar:</small><br />
                  {deuda === 0
                    ? <span className="badge bg-success">Al día</span>
                    : ningunoFalta
                      ? <span className="badge bg-success">No debe meses</span>
                      : todosFaltan
                        ? mesesDelAno.map((m, i) => <span key={i} className="badge bg-danger me-1">{m}</span>)
                        : mesesFaltantes.map((m, i) => <span key={i} className="badge bg-danger me-1">{m}</span>)
                  }
                </div>

                <div className="mt-3">
                  <small className="text-muted">Pagos realizados:</small><br />
                  {pagoMatricula && <span className="badge bg-success me-1">✔ Matrícula</span>}
                  {pagoPensiones && <span className="badge bg-primary me-1">✔ Pensiones</span>}
                  {!pagoMatricula && !pagoPensiones && <span className="badge bg-warning text-dark">⚠️ Sin pagos registrados</span>}
                </div>

                <hr />
                <div className="row">
                  <div className="col-md-4"><strong>Total Pagado:</strong> <span className="text-success">${total.toLocaleString('es-CO')}</span></div>
                  <div className="col-md-4"><strong>Deuda:</strong> <span className={deuda > 0 ? 'text-danger fw-bold' : 'text-success'}>${deuda.toLocaleString('es-CO')}</span></div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => editar(est)}>✏️</button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminar(est.id)}>🗑️</button>
                  </div>
                </div>

                <div className="mt-2 text-muted">
                  <small><strong>ID:</strong> {est.id || '-'} | <strong>Obs:</strong> {est.observaciones || 'Sin Observaciones'}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
