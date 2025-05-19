import { Component, OnInit } from '@angular/core';
import {CreditService} from '../../service/credit.service';
import {ClientService} from '../../service/client.service';
import {Credit} from '../../model/Credit.model';
import {Client} from '../../model/Client.model';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  imports: [
    FormsModule,
    DatePipe,
    CurrencyPipe
  ],
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  credits: Credit[] = [];
  clients: Client[] = [];
  selectedCredit: Credit | null = null;
  newCredit: Credit = {
    id: 0,
    montant: 0,
    dateDebut: new Date(),
    dateFin: new Date(),
    tauxInteret: 0,
    client: {} as Client,
    statut: 'en_cours'
  };

  constructor(
    private creditService: CreditService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadCredits();
    this.loadClients();
  }

  loadCredits(): void {
    this.creditService.getAllCredits().subscribe({
      next: (data) => this.credits = data,
      error: (err) => console.error('Erreur lors du chargement des crédits', err)
    });
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Erreur lors du chargement des clients', err)
    });
  }

  selectCredit(credit: Credit): void {
    this.selectedCredit = { ...credit };
  }

  createCredit(): void {
    this.creditService.createCredit(this.newCredit).subscribe({
      next: () => {
        this.loadCredits();
        this.resetNewCredit();
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }

  updateCredit(): void {
    if (this.selectedCredit) {
      this.creditService.updateCredit(this.selectedCredit.id, this.selectedCredit)
        .subscribe({
          next: () => {
            this.loadCredits();
            this.selectedCredit = null;
          },
          error: (err) => console.error('Erreur lors de la mise à jour', err)
        });
    }
  }

  deleteCredit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce crédit ?')) {
      this.creditService.deleteCredit(id).subscribe({
        next: () => this.loadCredits(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  private resetNewCredit(): void {
    // @ts-ignore
    this.newCredit = {
      id: 0,
      montant: 0,
      dateFin: new Date(),
      tauxInteret: 0,
      client: {} as Client,
  //    statut: 'en_cours'
    };
  }
}
