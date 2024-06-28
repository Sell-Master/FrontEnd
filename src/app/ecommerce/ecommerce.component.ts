import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/api/inventory.service';
import { AuthService } from '../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    MatIcon
  ],
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  products: any[] = [];
  favorites: any[] = [];
  userName: string | null = null;
  cart: any[] = [];
  display: boolean = false;
  selectedProduct: any = null;
  quantityForm: FormGroup;
  displayDetails: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.quantityForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadFavorites();
    this.loadCart();
    const userDetailsString = sessionStorage.getItem('user-details');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      if (userDetails) {
        this.userName = `${userDetails.firstName} ${userDetails.lastName}`;
      }
    }
  }

  loadProducts(): void {
    this.inventoryService.getInventory().subscribe(data => {
      const uniqueProducts = this.getUniqueProducts(data);
      this.products = uniqueProducts;
    });
  }

  getUniqueProducts(inventory: any[]): any[] {
    const productMap = new Map();
    inventory.forEach(item => {
      const product = item.product;
      if (!productMap.has(product.productID)) {
        productMap.set(product.productID, product);
      }
    });
    return Array.from(productMap.values());
  }

  addToCart(product: any): void {
    this.selectedProduct = product;
    this.quantityForm.reset();
    this.display = true;
  }

  confirmAddToCart(): void {
    if (this.quantityForm.valid) {
      const quantity = this.quantityForm.value.quantity;
      const cartItem = {
        ...this.selectedProduct,
        quantity,
        total: this.selectedProduct.price * quantity
      };
      this.cart.push(cartItem);
      sessionStorage.setItem('cart', JSON.stringify(this.cart));
      this.display = false;
    }
  }

  loadCart(): void {
    const cartString = sessionStorage.getItem('cart');
    if (cartString) {
      this.cart = JSON.parse(cartString);
    }
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  addToFavorites(product: any): void {
    const index = this.favorites.findIndex(fav => fav.productID === product.productID);
    if (index > -1) {
      this.favorites.splice(index, 1); // Remove from favorites
    } else {
      this.favorites.push(product); // Add to favorites
    }
    sessionStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites(): void {
    const favoritesString = sessionStorage.getItem('favorites');
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
    }
  }

  viewFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  showDetails(product: any): void {
    this.selectedProduct = product;
    this.displayDetails = true;
  }

  isFavorite(product: any): boolean {
    return this.favorites.some(fav => fav.productID === product.productID);
  }
}
