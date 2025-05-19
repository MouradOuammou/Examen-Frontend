export enum TypeRemboursement {
  MENSUALITE = 'MENSUALITE',
  REMBOURSEMENT_ANTICIPE = 'REMBOURSEMENT_ANTICIPE'
}

export interface Remboursement {
  id?: number;
  date: Date;
  montant: number;
  type: TypeRemboursement;
  creditId: number;
}
