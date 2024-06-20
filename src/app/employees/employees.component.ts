import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/api/user.service.spec';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-employees',
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
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = { typeOfUser: { description: '' } };
  displayDialog: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.filter(user => user.typeOfUser?.typeId === 2);
      // Asegurar que cada usuario tiene un typeOfUser por defecto si no está definido
      this.users = this.users.map(user => ({
        ...user,
        typeOfUser: user.typeOfUser || { description: '' }
      }));
    });
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
    this.displayDialog = true;
  }

  saveUser(): void {
    const userToSave = {
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      email: this.selectedUser.email,
      password: this.selectedUser.password || 'defaultPassword', // Asigna un valor por defecto si no hay contraseña
      typeId: 2 // Aseguramos que el tipo de usuario sea 2
    };

    if (this.selectedUser.userId) {
      this.userService.updateUser(this.selectedUser.userId, userToSave).subscribe(
        () => {
          this.loadUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error updating user:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user' });
        }
      );
    } else {
      this.userService.addUser(userToSave).subscribe(
        () => {
          this.loadUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added' });
          this.displayDialog = false;
        },
        error => {
          console.error('Error adding user:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding user' });
        }
      );
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.loadUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted' });
        },
        error => {
          console.error('Error deleting user:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting user' });
        }
      );
    }
  }

  addUser(): void {
    this.selectedUser = { typeOfUser: { description: '' } };
    this.displayDialog = true;
  }
  
}
