import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/api/user.service.spec';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.filter(user => user.typeOfUser.typeId === 2);
    });
  }

  editUser(userId: number): void {
    // Lógica para editar usuario
    console.log('Editar usuario', userId);
  }

  deleteUser(userId: number): void {
    // Lógica para eliminar usuario
    console.log('Eliminar usuario', userId);
  }
}