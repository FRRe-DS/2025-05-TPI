import { Request, Response } from "express";
import type { ICategoria } from "../types/index";

let categorias: ICategoria[] = [
  { id: 1, nombre: "Electrónica" },
  { id: 2, nombre: "Hogar" },
];

// POST /categorias  -> body: { nombre: string }
export function createCategory(req: Request, res: Response) {
  const { nombre } = req.body ?? {};
  if (typeof nombre !== "string" || nombre.trim().length < 2) {
    return res.status(400).json({ error: "nombre es requerido (min 2 caracteres)" });
  }
  const existe = categorias.some(c => c.nombre.toLowerCase() === nombre.trim().toLowerCase());
  if (existe) return res.status(409).json({ error: "La categoría ya existe" });

  const nueva: ICategoria = {
    id: categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1,
    nombre: nombre.trim(),
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
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "id debe ser numérico" });

  const idx = categorias.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Categoría no encontrada" });

  categorias.splice(idx, 1);
  return res.status(204).send();
}
