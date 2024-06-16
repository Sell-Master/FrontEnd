import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = {};
  displayDialog: boolean = false;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.displayDialog = true;
  }

  saveProduct(): void {
    const productToSave = {
      productType: this.selectedProduct.productType,
      brand: this.selectedProduct.brand,
      additionalInfo: this.selectedProduct.additionalInfo,
      price: this.selectedProduct.price
    };

    if (this.selectedProduct.productID) {
      this.productService.updateProduct(this.selectedProduct.productID, productToSave).subscribe(
        () => {
          this.loadProducts();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error updating product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating product' });
        }
      );
    } else {
      this.productService.addProduct(productToSave).subscribe(
        () => {
          this.loadProducts();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error adding product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding product' });
        }
      );
    }
  }

  deleteProduct(productID: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productID).subscribe(
        () => {
          this.loadProducts();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted' });
        },
        error => {
          console.error('Error deleting product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product' });
        }
      );
    }
  }

  addProduct(): void {
    this.selectedProduct = {};
    this.displayDialog = true;
  }
}
