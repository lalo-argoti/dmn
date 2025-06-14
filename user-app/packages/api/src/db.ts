import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

//Función para filtrar errores de datos faltantes en .env
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

export const dbConfig = {
  user: getEnvVar('DB_USER'),
  password: getEnvVar('DB_PASSWORD'),
  server: getEnvVar('DB_SERVER'),
  database: getEnvVar('DB_DATABASE'),
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to DB:', error);
    throw error;
  }
}
