export class BankDetails {
    nombre: string;
    apellido: string;
    numeroTarjeta: string;
    cvc: string;
    mes: number;
    año: number;
  
    constructor(nombre: string, apellido: string, numeroTarjeta: string, cvc: string, mes: number, año: number) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.numeroTarjeta = numeroTarjeta;
      this.cvc = cvc;
      this.mes = mes;
      this.año = año;
    }
  }
  