import type { Product } from "../models/products";
import type { productImage } from "../types/product";

export const productsData = [
  {
    id: 1,
    name: "Cartera Urbana",
    description: "",
    price: 25999,
    stock: 10,
    peso: 0.85,
    images: [
      { url: "https://example.com/images/cartera-urbana-1.jpg"},
      { url: "https://example.com/images/cartera-urbana-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 2,
    name: "Mochila Duna",
    description: "Mochila mediana ideal para uso diario, resistente al agua.",
    price: 31999,
    stock: 5,
    peso: 1.1,
    images: [
      { url: "https://example.com/images/mochila-duna-1.jpg"},
      { url: "https://example.com/images/mochila-duna-2.jpg"}
    ],
    categories: [2, 3]
  },
  {
    id: 3,
    name: "Billetera Cuero Clásica",
    description: "Billetera de cuero con múltiples ranuras para tarjetas y billetes.",
    price: 14999,
    stock: 20,
    peso: 0.25,
    images: [
      { url: "https://example.com/images/billetera-cuero-1.jpg"},
      { url: "https://example.com/images/billetera-cuero-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 4,
    name: "Bolso Totebag Cuore",
    description: "Bolso tote de tela con diseño estampado, ideal para el día a día.",
    price: 17999,
    stock: 12,
    peso: 0.6,
    images: [
      { url: "https://example.com/images/totebag-cuore-1.jpg"},
      { url: "https://example.com/images/totebag-cuore-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 5,
    name: "Mochila Jana Chica",
    description: "Mochila pequeña, práctica para salidas cortas y actividades urbanas.",
    price: 21999,
    stock: 8,
    peso: 0.7,
    images: [
      { url: "https://example.com/images/mochila-jana-1.jpg"},
      { url: "https://example.com/images/mochila-jana-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 6,
    name: "Billetera Morada y Verde",
    description: "Billetera colorida con compartimentos internos y cierre seguro.",
    price: 12999,
    stock: 15,
    peso: 0.22,
    images: [
      { url: "https://example.com/images/billetera-morada-verde-1.jpg"},
      { url: "https://example.com/images/billetera-morada-verde-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 7,
    name: "Cartera Iara",
    description: "Cartera elegante de cuero con detalles metálicos y cierre seguro.",
    price: 26999,
    stock: 9,
    peso: 0.9,
    images: [
      { url: "https://example.com/images/cartera-iara-1.jpg"},
      { url: "https://example.com/images/cartera-iara-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 8,
    name: "Mochila Duna Grande",
    description: "Mochila espaciosa ideal para viajes cortos o uso diario intensivo.",
    price: 35999,
    stock: 6,
    peso: 1.3,
    images: [
      { url: "https://example.com/images/mochila-duna-grande-1.jpg"},
      { url: "https://example.com/images/mochila-duna-grande-2.jpg"}
    ],
    categories: [2, 3]
  },
  {
    id: 9,
    name: "Billetera Ice",
    description: "Billetera compacta con diseño minimalista y cierre a presión.",
    price: 13999,
    stock: 18,
    peso: 0.2,
    images: [
      { url: "https://example.com/images/billetera-ice-1.jpg"},
      { url: "https://example.com/images/billetera-ice-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 10,
    name: "Cartera Aura Minibag",
    description: "Mini bolso moderno, práctico y liviano para salidas rápidas.",
    price: 19999,
    stock: 14,
    peso: 0.35,
    images: [
      { url: "https://example.com/images/cartera-aura-1.jpg"},
      { url: "https://example.com/images/cartera-aura-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 11,
    name: "Mochila Lapacho",
    description: "Mochila casual con múltiples bolsillos y resistente al agua.",
    price: 24999,
    stock: 7,
    peso: 0.95,
    images: [
      { url: "https://example.com/images/mochila-lapacho-1.jpg"},
      { url: "https://example.com/images/mochila-lapacho-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 12,
    name: "Billetera Naranja",
    description: "Billetera colorida con diseño moderno y cierre seguro.",
    price: 12999,
    stock: 22,
    peso: 0.23,
    images: [
      { url: "https://example.com/images/billetera-naranja-1.jpg"},
      { url: "https://example.com/images/billetera-naranja-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 13,
    name: "Bolso Tote Playa",
    description: "Bolso tote ligero, perfecto para la playa o salidas de verano.",
    price: 17999,
    stock: 10,
    peso: 0.55,
    images: [
      { url: "https://example.com/images/bolso-tote-playa-1.jpg"},
      { url: "https://example.com/images/bolso-tote-playa-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 14,
    name: "Mochila Sport XL",
    description: "Mochila deportiva con compartimentos para botella y ropa.",
    price: 32999,
    stock: 5,
    peso: 1.2,
    images: [
      { url: "https://example.com/images/mochila-sport-xl-1.jpg"},
      { url: "https://example.com/images/mochila-sport-xl-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 15,
    name: "Billetera Verde Oliva",
    description: "Billetera compacta de cuero con ranuras para tarjetas.",
    price: 13999,
    stock: 17,
    peso: 0.21,
    images: [
      { url: "https://example.com/images/billetera-verde-1.jpg"},
      { url: "https://example.com/images/billetera-verde-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 16,
    name: "Cartera Humo",
    description: "Cartera elegante con cierre metálico y diseño minimalista.",
    price: 25999,
    stock: 11,
    peso: 0.8,
    images: [
      { url: "https://example.com/images/cartera-humo-1.jpg"},
      { url: "https://example.com/images/cartera-humo-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 17,
    name: "Mochila Urban Pro",
    description: "Mochila resistente con múltiples compartimentos para gadgets.",
    price: 34999,
    stock: 6,
    peso: 1.15,
    images: [
      { url: "https://example.com/images/mochila-urban-pro-1.jpg"},
      { url: "https://example.com/images/mochila-urban-pro-2.jpg"}
    ],
    categories: [2, 3]
  },
  {
    id: 18,
    name: "Billetera Clásica Negra",
    description: "Billetera de cuero negro con diseño clásico y cierre seguro.",
    price: 14999,
    stock: 20,
    peso: 0.25,
    images: [
      { url: "https://example.com/images/billetera-negra-1.jpg"},
      { url: "https://example.com/images/billetera-negra-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 19,
    name: "Cartera Copo",
    description: "Cartera compacta con detalles bordados y cierre metálico.",
    price: 26999,
    stock: 9,
    peso: 0.85,
    images: [
      { url: "https://example.com/images/cartera-copo-1.jpg"},
      { url: "https://example.com/images/cartera-copo-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 20,
    name: "Mochila Mini Sport",
    description: "Mochila pequeña deportiva, ideal para actividades cortas.",
    price: 21999,
    stock: 7,
    peso: 0.65,
    images: [
      { url: "https://example.com/images/mochila-mini-sport-1.jpg"},
      { url: "https://example.com/images/mochila-mini-sport-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 21,
    name: "Billetera Azul Marino",
    description: "Billetera elegante con cierre de cremallera y compartimentos internos.",
    price: 13999,
    stock: 16,
    peso: 0.23,
    images: [
      { url: "https://example.com/images/billetera-azul-1.jpg"},
      { url: "https://example.com/images/billetera-azul-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 22,
    name: "Cartera Totebag Gris",
    description: "Bolso tote resistente con diseño neutro y amplio espacio interno.",
    price: 18999,
    stock: 10,
    peso: 0.6,
    images: [
      { url: "https://example.com/images/totebag-gris-1.jpg"},
      { url: "https://example.com/images/totebag-gris-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 23,
    name: "Mochila Trekking",
    description: "Mochila para actividades al aire libre con compartimentos especializados.",
    price: 37999,
    stock: 4,
    peso: 1.5,
    images: [
      { url: "https://example.com/images/mochila-trekking-1.jpg"},
      { url: "https://example.com/images/mochila-trekking-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 24,
    name: "Billetera Rosa Pastel",
    description: "Billetera pequeña y colorida, ideal para llevar en bolsos compactos.",
    price: 12999,
    stock: 20,
    peso: 0.2,
    images: [
      { url: "https://example.com/images/billetera-rosa-1.jpg"},
      { url: "https://example.com/images/billetera-rosa-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 25,
    name: "Cartera Totebag Cuero",
    description: "Bolso tote de cuero genuino con detalles sofisticados.",
    price: 29999,
    stock: 8,
    peso: 0.9,
    images: [
      { url: "https://example.com/images/totebag-cuero-1.jpg"},
      { url: "https://example.com/images/totebag-cuero-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 26,
    name: "Mochila Escolar",
    description: "Mochila práctica para estudiantes con compartimentos organizadores.",
    price: 23999,
    stock: 12,
    peso: 1.0,
    images: [
      { url: "https://example.com/images/mochila-escolar-1.jpg"},
      { url: "https://example.com/images/mochila-escolar-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 27,
    name: "Billetera Café Clásica",
    description: "Billetera de cuero café con diseño clásico y cierre seguro.",
    price: 14999,
    stock: 19,
    peso: 0.25,
    images: [
      { url: "https://example.com/images/billetera-cafe-1.jpg"},
      { url: "https://example.com/images/billetera-cafe-2.jpg"}
    ],
    categories: [4]
  },
  {
    id: 28,
    name: "Cartera Azul Mini",
    description: "Mini cartera elegante y liviana con detalles metálicos.",
    price: 19999,
    stock: 14,
    peso: 0.35,
    images: [
      { url: "https://example.com/images/cartera-azul-1.jpg"},
      { url: "https://example.com/images/cartera-azul-2.jpg"}
    ],
    categories: [1, 3]
  },
  {
    id: 29,
    name: "Mochila Compacta",
    description: "Mochila pequeña para uso urbano con compartimentos internos.",
    price: 21999,
    stock: 11,
    peso: 0.7,
    images: [
      { url: "https://example.com/images/mochila-compacta-1.jpg"},
      { url: "https://example.com/images/mochila-compacta-2.jpg"}
    ],
    categories: [2]
  },
  {
    id: 30,
    name: "Billetera Multicolor",
    description: "Billetera colorida y práctica con múltiples compartimentos.",
    price: 13999,
    stock: 18,
    peso: 0.22,
    images: [
      { url: "https://example.com/images/billetera-multicolor-1.jpg"},
      { url: "https://example.com/images/billetera-multicolor-2.jpg"}
    ],
    categories: [4]
  }
];

