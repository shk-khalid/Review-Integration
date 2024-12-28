export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin?: () => Promise<void>;
  googleCallback?: (query: string) => Promise<void>;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}