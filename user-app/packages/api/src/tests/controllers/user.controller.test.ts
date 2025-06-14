import { getUsers, getUserById } from '../../controllers/user.controller';
import { Request, Response } from 'express';
import sql from 'mssql';

// Mock del módulo mssql
jest.mock('mssql');

const mockUsers = [
  { id: 1, first_name: 'Carlos', last_name: 'López', email: 'carlos@test.com' },
  { id: 2, first_name: 'Ana', last_name: 'Gómez', email: 'ana@test.com' },
];

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    status = jest.fn(() => ({ json })) as any;

    req = {
      query: {
        page: '1',
        limit: '10',
        search: 'Carlos',
      },
      params: {
        id: '1',
      },
    };

    res = {
      json,
      status,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar usuarios con getUsers', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: mockUsers }),
    };

    (sql.connect as jest.Mock).mockResolvedValue({ request: () => mockRequest });

    await getUsers(req as Request, res as Response);

    expect(json).toHaveBeenCalledWith(mockUsers);
    expect(mockRequest.query).toHaveBeenCalled();
  });

  it('debería retornar un usuario con getUserById', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: [mockUsers[0]] }),
    };

    (sql.connect as jest.Mock).mockResolvedValue({ request: () => mockRequest });

    await getUserById(req as Request, res as Response);

    expect(json).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('debería retornar 404 si el usuario no existe', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: [] }),
    };

    (sql.connect as jest.Mock).mockResolvedValue({ request: () => mockRequest });

    await getUserById(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });
});
