// src/app/services/credit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credit } from '../model/Credit.model';
import { environment } from '../environments/environment';
import {StatutCredit} from '../model/StatutCredit.model';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = `${environment.apiUrl}/api/credits`;

  constructor(private http: HttpClient) {}

  getAllCredits(): Observable<Credit[]> {
    return this.http.get<Credit[]>(this.apiUrl);
  }
  getCreditById(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.apiUrl}/${id}`);
  }
  getCreditsByClientId(clientId: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/client/${clientId}`);
  }
  getCreditsByStatut(statut: StatutCredit): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/statut/${statut}`);
  }
  createCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.apiUrl, credit);
  }

  updateCredit(id: number | undefined, credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}/${id}`, credit);
  }
  updateCreditStatut(id: number, statut: StatutCredit): Observable<Credit> {
    let params = new HttpParams().set('statut', statut);
    return this.http.patch<Credit>(`${this.apiUrl}/${id}/statut`, {}, { params });
  }
  deleteCredit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getCreditPersonnelByMotif(motif: string): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/personnel/motif/${motif}`);
  }

  getCreditImmobilierByTypeBien(typeBien: string): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/immobilier/typeBien/${typeBien}`);
  }

  getCreditProfessionnelByRaisonSociale(raisonSociale: string): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/professionnel/raisonSociale/${raisonSociale}`);
  }
}
