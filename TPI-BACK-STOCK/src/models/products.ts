import type { productImage } from "../types/product.js";

export class Product{

  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public peso: number;
  public images: productImage[]; 
  public categories: number[];

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    peso: number,
    images: productImage[],
    categories: number[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.peso = peso;
    this.images = images;
    this.categories = categories;
  }

} 