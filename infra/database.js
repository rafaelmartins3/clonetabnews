import { Client } from "pg";
import fs from "fs";

async function query(queryObject) {
  const sslConfig =
    process.env.NODE_ENV === "development"
      ? false // Sem SSL no ambiente de desenvolvimento
      : {
          rejectUnauthorized: true, // Valida o certificado
          ca: fs.readFileSync("./prod-ca-2021.crt").toString(), // Certificado fornecido
        };

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: sslConfig,
  });

  console.log("credenciais do postgres", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
