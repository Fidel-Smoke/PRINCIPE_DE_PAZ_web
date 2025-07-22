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
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'
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

    const data = {
      ...form,
      valor_matricula: costosBase.matricula,
      valor_pension: pensionFinal,
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
    <div className="container py-4">
      <h2 className="text-center text-white fw-bold mb-4 fs-1">📘 Gestión de Estudiantes - Colegio Príncipe de Paz</h2>

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
              <label className="form-check-label " htmlFor="es_docente" style={{ cursor: 'pointer' }}>👨‍🏫Marque Aqui Si El acudiente es docente</label>
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

      <div className="mb-4 text-center mt-5 pt-5">
        <h1 className="fw-bold text-white mb-3">ESTUDIANTES REGISTRADOS</h1>
        <input
          type="text"
          className="form-control w-75 mx-auto"
          placeholder="🔍 Buscar por estudiante, documento, acudiente o curso..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped text-center">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th><
                th>Curso</th>
              <th>DocE</th>
              <th>Acudiente</th>
              <th>DocA</th>
              <th>Matrícula</th>
              <th>Pensión</th>
              <th>Meses Pagados</th>
              <th>Total</th>
              <th>Deuda</th>
              <th>Ref</th>
              <th>Obs</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesFiltrados.map(est => {
              const meses = JSON.parse(est.meses_pagados || '[]');
              const total = parseInt(est.valor_matricula) + parseInt(est.valor_pension) * meses.length;
              const deuda = parseInt(est.valor_matricula) + parseInt(est.valor_pension) * 10 - total;
              return (
                <tr key={est.id}>
                  <td>{est.nombre_estudiante} {est.es_docente === 1 && <span className="badge bg-info">👨‍🏫</span>}</td>
                  <td>{est.curso}</td>
                  <td>{est.documento_estudiante}</td>
                  <td>{est.nombre_acudiente}</td>
                  <td>{est.documento_acudiente}</td>
                  <td>${est.valor_matricula}</td>
                  <td>${est.valor_pension}</td>
                  <td>{meses.join(', ')}</td>
                  <td className="text-success fw-bold">${total}</td>
                  <td className={deuda > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>${deuda}</td>
                  <td>{est.referencia_pago}</td>
                  <td>{est.observaciones || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => editar(est)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(est.id)}>🗑️</button>
                  </td>
                </tr>
              );
            })}
            {estudiantesFiltrados.length === 0 && (
              <tr><td colSpan="13" className="text-center">No hay estudiantes registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
