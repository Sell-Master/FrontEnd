export class Order {
    fecha: string;
    montoTotal: number;
    products: {
      productID: number;
      quantity: number;
      price: number;
      total: number;
    }[];
  
    constructor(fecha: string, montoTotal: number, products: any[]) {
      this.fecha = fecha;
      this.montoTotal = montoTotal;
      this.products = products;
    }
  }
  