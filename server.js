import "dotenv/config";

import app from "./src/app.js";
import config from "./src/config.js";

import {connectDB} from './src/mongo.js';

async function main() {
  await connectDB(); //conecta a mongo

  app.listen(config.port, () => {
    console.log(`desplegado en http://localhost:${config.port}`); //arranca express
  });
}

main();
