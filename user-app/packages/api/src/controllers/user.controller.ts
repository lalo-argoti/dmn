import { Request, Response } from 'express';
import sql from 'mssql';
import { getConnection } from '../db';
import { dbConfig } from '../db';

export const getUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || '';

  const offset = (page - 1) * limit;

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input('search', sql.NVarChar, `%${search}%`)
      .input('limit', sql.Int, limit)
      .input('offset', sql.Int, offset)
      .query(`
        SELECT * FROM dmn_users
        WHERE first_name LIKE @search OR last_name LIKE @search
        ORDER BY created_at DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
      `);
    console.log(`se ha llamado a %${search}%`)
    res.json(result.recordset);  // solo llamar, no retornar
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM dmn_users WHERE id = @id');

    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;  // Para que no continue y no retorne res.json
    }

    res.json(result.recordset[0]);  // solo llamar
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
};
