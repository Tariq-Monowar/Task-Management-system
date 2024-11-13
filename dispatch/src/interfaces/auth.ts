export interface User {
  _id: string;
  [key: string]: any; 
}

export interface ErrorResponse {
  message: string;
}

export interface UserData {
  userName?: string;
  email: string;
  password: string;
}

export interface AuthState {
  loginLoading: boolean;
  signupLoading: boolean;
  appLoading: boolean;
  otpLoading: boolean;
  user: User | any;
  loginError: string | null;
  signupError: string | null;
  otpError: string | null;
  userUpddateError: string | null;
  userUpdateLoading: Boolean;
  appLoadingError: string | null;
  isAuthenticated: Boolean;
  callCount: number;
 
}


export interface userProps {
  user: User | null;
}