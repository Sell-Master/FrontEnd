import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sells',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule
  ],  templateUrl: './sells.component.html',
  providers: [DatePipe],
  styleUrl: './sells.component.css'
})
export class SellsComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = { client: {}, user: {}, fecha: new Date().toISOString(), montoTotal: 0 };
  clients: any[] = [];
  users: any[] = [];
  displayDialog: boolean = false;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadClients();
    this.loadUsers();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  loadClients(): void {
    this.orderService.getClients().subscribe(data => {
      this.clients = data.map(client => ({
        ...client,
        fullInfo: `${client.firstName} ${client.lastName} (DNI: ${client.dni})`
      }));
    });
  }

  loadUsers(): void {
    this.orderService.getUsers().subscribe(data => {
      this.users = data.filter(user => user.typeOfUser?.typeId === 1 || user.typeOfUser?.typeId === 2).map(user => ({
        ...user,
        fullInfo: `${user.firstName} ${user.lastName} (${user.typeOfUser.description})`
      }));
    });
  }
  
  editOrder(order: any): void {
    this.selectedOrder = { ...order, fecha: this.datePipe.transform(new Date(), 'dd-MM-yyyy') };
    this.displayDialog = true;
  }

  saveOrder(): void {
    const orderToSave = {
      fecha: new Date().toISOString(),
      montoTotal: this.selectedOrder.montoTotal,
      clientID: this.selectedOrder.client.clientId,
      userID: this.selectedOrder.user.userId
    };

    if (this.selectedOrder.orderID) {
      this.orderService.updateOrder(this.selectedOrder.orderID, orderToSave).subscribe(
        () => {
          this.loadOrders();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order updated' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error updating order:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating order' });
        }
      );
    } else {
      this.orderService.addOrder(orderToSave).subscribe(
        () => {
          this.loadOrders();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order added' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error adding order:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding order' });
        }
      );
    }
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.loadOrders();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order deleted' });
        },
        error => {
          console.error('Error deleting order:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting order' });
        }
      );
    }
  }

  addOrder(): void {
    this.selectedOrder = { client: {}, user: {}, fecha: new Date().toISOString(), montoTotal: 0 };
    this.displayDialog = true;
  }
}
