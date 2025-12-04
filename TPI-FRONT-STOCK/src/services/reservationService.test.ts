import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cancelReservation } from './reservationService';
import { api } from '../client/axios';

vi.mock('../client/axios');

const mockDelete = vi.fn();
(api as any).delete = mockDelete;

describe('cancelReservation', () => {
  beforeEach(() => {
    mockDelete.mockReset();
  });

  it('llama a api.delete con el id correcto y resuelve la promesa', async () => {
    mockDelete.mockResolvedValueOnce({ data: [] });
    await expect(cancelReservation(123)).resolves.toBeUndefined();
    expect(mockDelete).toHaveBeenCalledWith('/reservas', { params: { usuarioId: 123 } });
  });

  it('lanza error si falla la petición', async () => {
    mockDelete.mockRejectedValueOnce(new Error('fallo petición'));  
    await expect(cancelReservation(999)).rejects.toThrow('fallo petición');
  });
});
