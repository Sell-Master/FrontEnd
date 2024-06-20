import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getDispatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dispatches`);
  }

  getDispatchById(dispatchId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dispatches/${dispatchId}`);
  }

  updateDispatch(dispatchId: number, dispatch: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/dispatches/${dispatchId}`, dispatch);
  }

  deleteDispatch(dispatchId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/dispatches/${dispatchId}`);
  }

  addDispatch(dispatch: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/dispatches`, dispatch);
  }
}

