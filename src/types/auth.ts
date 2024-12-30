export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  client_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
}

export interface LoginResponse extends RegisterResponse {
  token: string;
}

export interface GoogleAuthResponse {
  token: string;
  user: User;
  message: string;
}