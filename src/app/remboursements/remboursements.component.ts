import { Component, OnInit } from '@angular/core';
import {Remboursement} from '../../model/model.model';
import {Credit} from '../../model/Credit.model';
import {RemboursementService} from '../../service/remboursement.service';
import {CreditService} from '../../service/credit.service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-remboursements',
  templateUrl: './remboursements.component.html',
  imports: [
    FormsModule,
    CurrencyPipe,
    DatePipe
  ],
  styleUrls: ['./remboursements.component.css']
})
export class RemboursementsComponent implements OnInit {
  remboursements: Remboursement[] = [];
  credits: Credit[] = [];
  selectedRemboursement: Remboursement | null = null;
  // @ts-ignore
  newRemboursement: Remboursement = {
    id: 0,
    montant: 0,
    date: new Date(),
    credit: {} as Credit,
    methode: 'espece'
  };

  constructor(
    private remboursementService: RemboursementService,
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
    this.loadRemboursements();
    this.loadCredits();
  }

  loadRemboursements(): void {
    this.remboursementService.getAllRemboursements().subscribe({
      next: (data) => this.remboursements = data,
      error: (err) => console.error('Erreur lors du chargement des remboursements', err)
    });
  }

  loadCredits(): void {
    this.creditService.getAllCredits().subscribe({
      next: (data) => this.credits = data,
      error: (err) => console.error('Erreur lors du chargement des crédits', err)
    });
  }

  selectRemboursement(remboursement: Remboursement): void {
    this.selectedRemboursement = { ...remboursement };
  }

  createRemboursement(): void {
    this.remboursementService.createRemboursement(this.newRemboursement).subscribe({
      next: () => {
        this.loadRemboursements();
        this.resetNewRemboursement();
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }

  updateRemboursement(): void {
    if (this.selectedRemboursement) {
      this.remboursementService.updateRemboursement(this.selectedRemboursement.id, this.selectedRemboursement)
        .subscribe({
          next: () => {
            this.loadRemboursements();
            this.selectedRemboursement = null;
          },
          error: (err) => console.error('Erreur lors de la mise à jour', err)
        });
    }
  }

  deleteRemboursement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce remboursement ?')) {
      this.remboursementService.deleteRemboursement(id).subscribe({
        next: () => this.loadRemboursements(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  private resetNewRemboursement(): void {
    this.newRemboursement = {
      id: 0,
      montant: 0,
      date: new Date(),
      credit: {} as Credit,
      methode: 'espece'
    };
  }
}
