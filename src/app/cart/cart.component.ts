import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Order } from '../services/storage/order.model';
import { BankDetails } from '../services/storage/BankDetails';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BankDetailsFormComponent } from '../bank-details-form/bank-details-form.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ButtonModule,
    MatDialogModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart(): void {
    const cartString = sessionStorage.getItem('cart');
    if (cartString) {
      this.cart = JSON.parse(cartString);
    }
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((acc, item) => acc + item.total, 0);
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter(cartItem => cartItem.productID !== product.productID);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();
  }

  backToEcommerce(): void {
    this.router.navigate(['/ecommerce']);
  }

  saveOrder(): void {
    const dialogRef = this.dialog.open(BankDetailsFormComponent, {
      width: '600px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const order = new Order(
          new Date().toISOString(),
          this.total,
          this.cart.map(product => ({
            productID: product.productID,
            quantity: product.quantity,
            price: product.price,
            total: product.total
          })),
          result // bank details
        );
  
        const ordersString = localStorage.getItem('orders');
        let orders = [];
        if (ordersString) {
          orders = JSON.parse(ordersString);
        }
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        this.clearCart();
        alert('Order saved successfully');
      }
    });
  }

  clearCart(): void {
    this.cart = [];
    sessionStorage.removeItem('cart');
  }
}
