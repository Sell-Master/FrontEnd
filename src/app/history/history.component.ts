import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Order } from '../services/storage/order.model';
import { ProductService } from '../services/api/product.service';
import { AccordionModule } from 'primeng/accordion'; // Import PrimeNG Accordion module

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    AccordionModule // Add AccordionModule to imports
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders: Order[] = [];
  productsDetails: any = {};

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const ordersString = localStorage.getItem('orders');
    if (ordersString) {
      this.orders = JSON.parse(ordersString);
      this.orders.forEach(order => {
        order.products.forEach(product => {
          this.loadProductDetails(product.productID);
        });
      });
    }
  }

  loadProductDetails(productID: number): void {
    this.productService.getProductById(productID).subscribe(
      productDetails => {
        this.productsDetails[productID] = productDetails;
      },
      error => {
        console.error('Error fetching product details', error);
      }
    );
  }

  backToEcommerce(): void {
    this.router.navigate(['/ecommerce']);
  }
}
