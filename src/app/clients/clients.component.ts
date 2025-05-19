import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../service/client.service';
import {Client} from '../../model/Client.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  newClient: Client = {
    id: 0,
    nom: '',
    email: '',
  };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Erreur lors du chargement des clients', err)
    });
  }

  selectClient(client: Client): void {
    this.selectedClient = { ...client };
  }

  createClient(): void {
    this.clientService.createClient(this.newClient).subscribe({
      next: () => {
        this.loadClients();
        this.newClient = {
          id: 0,
          nom: '',
          email: '',
        };
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }

  updateClient(): void {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.id, this.selectedClient)
        .subscribe({
          next: () => {
            this.loadClients();
            this.selectedClient = null;
          },
          error: (err) => console.error('Erreur lors de la mise à jour', err)
        });
    }
  }

  deleteClient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}
