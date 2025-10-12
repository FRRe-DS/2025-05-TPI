import type { Request, Response } from "express";

import { ProductService } from "../services/productServices.js";

export class ProductController{

  private productService = new ProductService();

  findProducts( req:Request, res: Response ){

    const products = this.productService.findAllProducts()

    if(!products) res.status(400).json({message: "Productos no encontrados"})

    res.status(200).json(products);

  }

  findProductById( req:Request, res: Response ){
    
    //www.algo.com/products/15

    const id  = Number(req.params.id);

    const product = this.productService.findProductById(id);

    if(!product) res.status(400).json({message: "Producto no encontrado, id invalida"});

    if(product){
      if(product.description == "") res.status(400).json({message: "Falto este dato: descripcion "});
      res.status(200).json(product);
    }
  }

  createProduct( req:Request, res: Response ){
    
    //www.algo.com/products/createProduc

    const productToPost = req.body;

    //createProductService(productToPost)

    if(!productToPost) res.status(400).json({message: "Producto no encontrado, id invalida"});

    if(productToPost){
      if(productToPost.description == "") res.status(400).json({message: "Falto este dato: descripcion "});
      res.status(200).json(productToPost);
    }
  }
}