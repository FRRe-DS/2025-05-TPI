import { CategoryService } from "./category.service";

describe("CategoryService", () => {
  let mockRepository: any;
  let service: CategoryService;

  beforeEach(() => {
    mockRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn()
    };
    service = new CategoryService(mockRepository);
  });

  it("debería crear correctamente una categoría nueva cuando el nombre es válido y único", async () => {
    mockRepository.findByName.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue({ id: 123, nombre: "TestCat" });
    const result = await service.createCategory({ nombre: "TestCat" });
    expect(result).toEqual({ id: 123, nombre: "TestCat" });
    expect(mockRepository.findByName).toHaveBeenCalledWith("TestCat");
    expect(mockRepository.create).toHaveBeenCalledWith({ nombre: "TestCat" });
  });

  it("debe lanzar error de validación si el nombre es muy corto", async () => {
    await expect(service.createCategory({ nombre: "A" })).rejects.toThrow(
      /VALIDATION_ERROR/
    );
  });
});
