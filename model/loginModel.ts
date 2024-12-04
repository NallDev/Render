export interface LoginResponse {
  error: boolean;
  message: string;
  loginResult: LoginResult;
}

export interface LoginResult {
  userId: string;
  name: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
