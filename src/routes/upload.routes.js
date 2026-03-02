import { Router } from 'express';
import multer from 'multer';
import * as u from '../controllers/upload.controller.js';

const router = Router();
const upload = multer({ dest: 'uploads/' }); //Crea la carpeta donde se guardan (temporalmente) los archivos de csv cuando se cargan


//'archivo' -> lo que debe de ir en postgres al llamar el archivo
// upload -> carga el archivo en la carpeta upload
// .single -> es un solo archivo, si fueran varios seria .array()
router.post('/api/upload/cargos', upload.single('archivo'), u.uploadCargos); 
router.post('/api/upload/editoriales', upload.single('archivo'), u.uploadEditoriales);
router.post('/api/upload/categorias', upload.single('archivo'), u.uploadCategorias);
router.post('/api/upload/autores', upload.single('archivo'), u.uploadAutores);
router.post('/api/upload/clientes', upload.single('archivo'), u.uploadClientes);
router.post('/api/upload/empleados', upload.single('archivo'), u.uploadEmpleados);
router.post('/api/upload/libros', upload.single('archivo'), u.uploadLibros);
router.post('/api/upload/prestamos', upload.single('archivo'), u.uploadPrestamos);

router.get('/logs', u.listarLogs);

export default router;
