// se ponen {} cuando quiero importar exports nombrados
import {MongoClient} from 'mongodb';

const URL_MONGO = process.env.MONGO_URL;
const client = new MongoClient(URL_MONGO); //objeto conector a mongo

let logsCollection; //se guardara la coleccion de logs

// connectDB: conecta a Mongo
export async function connectDB() {
  try {
    await client.connect(); // conecta a mongo
    console.log('Mongo conectado');

    const db = client.db('app'); // selecciona la base de datos llamada "app"

    logsCollection = db.collection('logs'); //selecciona la colección "logs" dentro de esa BD (si no existe, Mongo la crea cuando insertes)
    console.log('Colección logs lista');

  } catch (error) {
    console.log('Error conectando Mongo:', error.message);
  }
}

// saveLog: inserta y guarda un log 
export async function saveLog(action) {
  try {
    // Inserta un documento en logs con la acción y fecha
    await logsCollection.insertOne({ 
      action,
      created_at: new Date(),
    });

    console.log(`log ${action} agregado`);
  } catch (error) {
    console.log('error en saveLog:', error.message);
  }
}

// getLogs: obtiene los logs para el endpoint
export async function getLogs() {
  return await logsCollection
    .find() // Busca todos los documentos
    .sort({ created_at: -1 }) // Ordena por created_at descendente (más reciente primero)
    .toArray(); // Convierte el resultado (cursor) a un array
}
