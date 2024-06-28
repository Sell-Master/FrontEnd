export class Order {
  fecha: string;
  montoTotal: number;
  products: {
    productID: number;
    quantity: number;
    price: number;
    total: number;
  }[];
  bankDetails: {
    nombre: string;
    apellido: string;
    numeroTarjeta: string;
    cvc: string;
    mes: number;
    año: number;
  };

  constructor(fecha: string, montoTotal: number, products: any[], bankDetails: any) {
    this.fecha = fecha;
    this.montoTotal = montoTotal;
    this.products = products;
    this.bankDetails = bankDetails;
  }
}
