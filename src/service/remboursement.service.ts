import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Remboursement, TypeRemboursement } from '../model/remboursement.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemboursementService {
  private apiUrl = `${environment.apiUrl}/api/remboursements`;

  constructor(private http: HttpClient) {}

  getAllRemboursements(): Observable<Remboursement[]> {
    return this.http.get<Remboursement[]>(this.apiUrl);
  }

  getRemboursementById(id: number): Observable<Remboursement> {
    return this.http.get<Remboursement>(`${this.apiUrl}/${id}`);
  }

  getRemboursementsByCreditId(creditId: number): Observable<Remboursement[]> {
    return this.http.get<Remboursement[]>(`${this.apiUrl}/credit/${creditId}`);
  }

  getRemboursementsByType(type: TypeRemboursement): Observable<Remboursement[]> {
    return this.http.get<Remboursement[]>(`${this.apiUrl}/type/${type}`);
  }

  createRemboursement(remboursement: Remboursement): Observable<Remboursement> {
    return this.http.post<Remboursement>(this.apiUrl, remboursement);
  }

  updateRemboursement(id: number, remboursement: Remboursement): Observable<Remboursement> {
    return this.http.put<Remboursement>(`${this.apiUrl}/${id}`, remboursement);
  }

  deleteRemboursement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
