import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory`);
  }

  getInventoryById(inventoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory/${inventoryId}`);
  }

  updateInventory(inventoryId: number, inventory: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/inventory/${inventoryId}`, inventory);
  }

  deleteInventory(inventoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventory/${inventoryId}`);
  }

  addInventory(inventory: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inventory`, inventory);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
}
