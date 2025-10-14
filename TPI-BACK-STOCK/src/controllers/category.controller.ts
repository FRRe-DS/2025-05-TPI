import { Request, Response } from "express";

let categorias = [
  { id: 1, name: "Electrónica", description: "Productos tecnológicos" },
  { id: 2, name: "Hogar", description: "Artículos para el hogar" },
];

// POST /categorias
export function createCategory(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const nueva = {
    id: categorias.length + 1,
    name,
    description: description || "",
  };

  categorias.push(nueva);
  return res.status(201).json(nueva);
}

// GET /categorias
export function listCategories(_req: Request, res: Response) {
  return res.json(categorias);
}

// DELETE /categorias/:id
export function deleteCategory(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const index = categorias.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  categorias.splice(index, 1);
  return res.status(204).send();
}
