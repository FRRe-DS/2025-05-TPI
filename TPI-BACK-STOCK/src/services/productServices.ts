import { productsData } from "../data/productData.js";
import { Product } from "../models/products.js";

export class ProductService{

  private products = productsData;

  findAllProducts(): Product[] | null {

    if (this.products.length == 0) return null;

    return this.products
  }

  findProductById(id: number): Product | null {

    const product = this.products.find( (productAux) => productAux.id = id );

    if (!product) return null;

    return product
  }

}