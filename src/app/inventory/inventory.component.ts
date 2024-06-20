import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/api/inventory.service';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryItems: any[] = [];
  selectedInventory: any = { product: {}, user: {}, stock: 0 };
  products: any[] = [];
  users: any[] = [];
  displayDialog: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loadProducts();
    this.loadUsers();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(data => {
      this.inventoryItems = data;
    });
  }

  loadProducts(): void {
    this.inventoryService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadUsers(): void {
    this.inventoryService.getUsers().subscribe(data => {
      this.users = data.filter(user => user.typeOfUser?.typeId === 1 || user.typeOfUser?.typeId === 2);
    });
  }

  editInventory(item: any): void {
    this.selectedInventory = { ...item };
    this.displayDialog = true;
  }

  saveInventory(): void {
    const inventoryToSave = {
      productID: this.selectedInventory.product.productID,
      userID: this.selectedInventory.user.userId,
      stock: this.selectedInventory.stock
    };

    if (this.selectedInventory.inventoryID) {
      this.inventoryService.updateInventory(this.selectedInventory.inventoryID, inventoryToSave).subscribe(
        () => {
          this.loadInventory();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventory updated' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error updating inventory:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating inventory' });
        }
      );
    } else {
      this.inventoryService.addInventory(inventoryToSave).subscribe(
        () => {
          this.loadInventory();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventory added' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error adding inventory:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding inventory' });
        }
      );
    }
  }

  deleteInventory(inventoryId: number): void {
    if (confirm('Are you sure you want to delete this inventory?')) {
      this.inventoryService.deleteInventory(inventoryId).subscribe(
        () => {
          this.loadInventory();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventory deleted' });
        },
        error => {
          console.error('Error deleting inventory:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting inventory' });
        }
      );
    }
  }

  addInventory(): void {
    this.selectedInventory = { product: {}, user: {}, stock: 0 };
    this.displayDialog = true;
  }
}
