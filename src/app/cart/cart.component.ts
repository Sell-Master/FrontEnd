import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ButtonModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(private router: Router) {}

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
}
