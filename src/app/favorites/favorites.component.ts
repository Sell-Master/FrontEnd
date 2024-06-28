import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  cart: any[] = [];
  displayQuantityDialog: boolean = false;
  displayDetailsDialog: boolean = false;
  selectedProduct: any = null;
  quantityForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.quantityForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadFavorites();
    this.loadCart();
  }

  loadFavorites(): void {
    const favoritesString = sessionStorage.getItem('favorites');
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
    }
  }

  removeFromFavorites(product: any): void {
    this.favorites = this.favorites.filter(fav => fav.productID !== product.productID);
    sessionStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addToCart(product: any): void {
    this.selectedProduct = product;
    this.quantityForm.reset();
    this.displayQuantityDialog = true;
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
      this.displayQuantityDialog = false;
    }
  }

  loadCart(): void {
    const cartString = sessionStorage.getItem('cart');
    if (cartString) {
      this.cart = JSON.parse(cartString);
    }
  }

  showDetails(product: any): void {
    this.selectedProduct = product;
    this.displayDetailsDialog = true;
  }

  backToEcommerce() {
    this.router.navigate(['/ecommerce']);
  }
}
