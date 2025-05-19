import {Credit} from './Credit.model';

export interface ClientModel {
  id?: number;
  nom: string;
  email: string;
  credits?: Credit[];
}



