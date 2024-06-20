import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(productID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productID}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(productID: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productID}`, product);
  }

  deleteProduct(productID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productID}`);
  }
  
}
