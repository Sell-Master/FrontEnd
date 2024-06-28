import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Order } from '../services/storage/order.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders: Order[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const ordersString = localStorage.getItem('orders');
    if (ordersString) {
      this.orders = JSON.parse(ordersString);
    }
  }

  backToEcommerce(): void {
    this.router.navigate(['/ecommerce']);
  }
}