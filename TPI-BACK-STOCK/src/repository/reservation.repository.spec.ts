import { ReservationRepository } from "./reservation.repository";
import { AppDataSource } from "../config/appDataSource";
import { EstadoReserva } from "../types/reservation";

jest.mock("../config/appDataSource");

describe("ReservationRepository (transactions)", () => {
  let repo: ReservationRepository;
  let mockRunner: any;
  let mockManager: any;

  beforeEach(() => {
    mockManager = {
      createQueryBuilder: jest.fn(),
      decrement: jest.fn(),
      increment: jest.fn(),
      save: jest.fn(),
      create: jest.fn()
    };
    mockRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: mockManager
    };
    (AppDataSource.createQueryRunner as jest.Mock).mockReturnValue(mockRunner);
    repo = new ReservationRepository();
  });

  describe("createReservation", () => {
    it("debería crear una reserva, descontar stock y commitear la transacción (flujo feliz)", async () => {
      // Simulando productos válidos con stock.
      const fakeProducts = [
        { productoId: 1, cantidad: 2 },
        { productoId: 2, cantidad: 1 },
      ];
      const input = { idCompra: "A1", usuarioId: 5, productos: fakeProducts };

      // Mock de queryBuilder por cada producto
      let buildIndex = 0;
      mockManager.createQueryBuilder.mockImplementation(() => ({
        where: () => ({
          setLock: () => ({
            getOne: () => Promise.resolve({
              id: fakeProducts[buildIndex].productoId,
              nombre: "ProdTest" + buildIndex,
              stockDisponible: 5,
              precio: 100 * (buildIndex + 1)
            })
          })
        })
      }));
      mockManager.decrement.mockResolvedValue({});
      mockManager.create.mockImplementation((_Entity, data) => ({ ...data }));
      mockManager.save.mockResolvedValue({ idReserva: 9, items: [], ...input });

      const result = await repo.createReservation(input as any);
      expect(result).toMatchObject({ idReserva: 9, usuarioId: 5 });
      expect(mockManager.decrement).toHaveBeenCalled();
      expect(mockRunner.commitTransaction).toHaveBeenCalled();
      expect(mockRunner.rollbackTransaction).not.toHaveBeenCalled();
    });

    it("lanza error y hace rollback si el producto no existe", async () => {
      mockManager.createQueryBuilder.mockReturnValue({ where: () => ({ setLock: () => ({ getOne: () => Promise.resolve(null) }) }) });
      const input = { idCompra: "A2", usuarioId: 5, productos: [{ productoId: 77, cantidad: 1 }] };
      await expect(repo.createReservation(input as any)).rejects.toThrow(/PRODUCT_NOT_FOUND/);
      expect(mockRunner.rollbackTransaction).toHaveBeenCalled();
    });

    it("lanza error y hace rollback si el stock es insuficiente", async () => {
      mockManager.createQueryBuilder.mockReturnValue({ where: () => ({ setLock: () => ({ getOne: () => Promise.resolve({ id: 1, nombre: "Prod", stockDisponible: 0, precio: 10 }) }) }) });
      const input = { idCompra: "A2", usuarioId: 5, productos: [{ productoId: 1, cantidad: 2 }] };
      await expect(repo.createReservation(input as any)).rejects.toThrow(/PRODUCT_STOCK_ERROR/);
      expect(mockRunner.rollbackTransaction).toHaveBeenCalled();
    });
  });

  describe("cancelReservation", () => {
    it("debe cancelar una reserva, restituir stock y confirmar commit (flujo feliz)", async () => {
      // la reserva existe, no está cancelada
      const fakeReservation = {
        idReserva: 1,
        estado: EstadoReserva.PENDIENTE,
        items: [{ cantidad: 2, producto: { id: 9 } }, { cantidad: 1, producto: { id: 5 } }],
      };
      mockManager.createQueryBuilder.mockReturnValue({
        innerJoinAndSelect: () => ({
          innerJoinAndSelect: () => ({
            where: () => ({ setLock: () => ({ getOne: () => Promise.resolve(fakeReservation) }) })
          })
        })
      });
      mockManager.increment.mockResolvedValue({});
      mockManager.save.mockResolvedValue({ ...fakeReservation, estado: EstadoReserva.CANCELADO });

      const result = await repo.cancelReservation(1);
      expect(result).toBe(true);
      expect(mockManager.increment).toHaveBeenCalledTimes(2);
      expect(mockManager.save).toHaveBeenCalledWith({ ...fakeReservation, estado: EstadoReserva.CANCELADO });
      expect(mockRunner.commitTransaction).toHaveBeenCalled();
    });

    it("retorna false y hace rollback si la reserva no existe o ya está cancelada", async () => {
      mockManager.createQueryBuilder.mockReturnValue({
        innerJoinAndSelect: () => ({
          innerJoinAndSelect: () => ({
            where: () => ({ setLock: () => ({ getOne: () => Promise.resolve() }) })
          })
        })
      });
      // Caso reserva no encontrada
      let res = await repo.cancelReservation(99);
      expect(res).toBe(false);
      expect(mockRunner.rollbackTransaction).toHaveBeenCalled();
      // Caso ya cancelada
      mockManager.createQueryBuilder.mockReturnValue({
        innerJoinAndSelect: () => ({
          innerJoinAndSelect: () => ({
            where: () => ({ setLock: () => ({ getOne: () => Promise.resolve({ estado: EstadoReserva.CANCELADO, items: [] }) }) })
          })
        })
      });
      res = await repo.cancelReservation(1);
      expect(res).toBe(false);
      expect(mockRunner.rollbackTransaction).toHaveBeenCalledTimes(2);
    });
  });
});
