import {StatutCredit} from './StatutCredit.model';
import {Remboursement} from './model.model';

export interface Credit {
  id?: number;
  dateDemande: Date;
  statut: StatutCredit;
  dateAcception?: Date;
  montant: number;
  duree: number;
  tauxInteret: number;
  clientId: number;
  type: string;
  motif?: string;
  typeBien?: string;
  raisonSociale?: string;
  remboursements?: Remboursement[];
}
