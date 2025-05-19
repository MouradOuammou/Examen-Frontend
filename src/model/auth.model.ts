export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

export interface User {
  id?: number;
  username: string;
  role: string;
  clientId?: number;
}
