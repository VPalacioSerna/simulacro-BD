import fs from 'fs';
import { parse } from 'csv-parse';
import  pool from '../db.js';

import {getLogs, saveLog} from '../mongo.js';

export const listarLogs = async (req, res) => {
  try {
    const logs = await getLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'internal server error mongoDB' });
  }
};

// POST /api/upload/cargos
export const uploadCargos = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path) //crea el archivo (temporalmente) en la carpeta uploads
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.nombre}')`).join(',');
          await pool.query(`INSERT INTO cargos (id, nombre) VALUES ${values}`);
          await saveLog('INSERT cargos');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {}); //Elimina el archivo guardado en la carpeta uploads
      }
    });
};

// POST /api/upload/editoriales
export const uploadEditoriales = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.nombre}')`).join(',');
          await pool.query(`INSERT INTO editoriales (id,nombre) VALUES ${values}`);
          await saveLog('INSERT editoriales');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

// POST /api/upload/categorias
export const uploadCategorias = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.nombre}')`).join(',');
          await pool.query(`INSERT INTO categorias (id,nombre) VALUES ${values}`);
          await saveLog('INSERT categorias');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

// POST /api/upload/autores
export const uploadAutores = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.nombre}')`).join(',');
          await pool.query(`INSERT INTO autores (id,nombre) VALUES ${values}`);
          await saveLog('INSERT autores');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

// POST /api/upload/clientes
export const uploadClientes = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.nombre}','${r.telefono}','${r.correo}')`).join(',');
          await pool.query(`INSERT INTO clientes (id,nombre,telefono,correo) VALUES ${values}`);
          await saveLog('INSERT clientes');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

// POST /api/upload/empleados
export const uploadEmpleados = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.nombre}','${r.id_cargo}')`).join(',');
          await pool.query(`INSERT INTO empleados (id,nombre,id_cargo) VALUES ${values}`);
          await saveLog('INSERT empleados');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

// POST /api/upload/libros
export const uploadLibros = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.titulo}','${r.anio_publicacion}','${r.precio}','${r.id_autor}','${r.id_categoria}','${r.id_editorial}')`).join(',');
          await pool.query(`INSERT INTO libros (id,titulo,anio_publicacion,precio,id_autor,id_categoria,id_editorial) VALUES ${values}`);
          await saveLog('INSERT libros');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

// POST /api/upload/prestamos
export const uploadPrestamos = (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        if (rows.length) {
          const values = rows.map(r => `('${r.id}','${r.fecha_prestamo}','${r.fecha_devolucion}','${r.id_cliente}','${r.id_empleado}','${r.id_libro}')`).join(',');
          await pool.query(`INSERT INTO prestamos (id,fecha_prestamo,fecha_devolucion,id_cliente,id_empleado,id_libro) VALUES ${values}`);
          await saveLog('INSERT prestamos');
        }
        res.json({ ok: true, total: rows.length });
      } catch (err) {
        res.status(500).json({ error: 'Error insertando datos', detail: err.message });
      } finally {
        fs.unlink(req.file.path, () => {});
      }
    });
};

