import {Gender} from '../../interfaces/enums/Gender';
import {Unit} from '../../interfaces/enums/Unit';
import {User} from '../../interfaces/auth/User';

export namespace Auth {
  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface LoginRootResponse {
    authToken: string;
    refreshToken: string;
    user: User.Details;
  }

  export interface AuthState {
    authToken: string | null;
    refreshToken: string | null;
    user: User.Details | null;
  }

  export interface RegisterUserParams {
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
    city?: string;
    tempCode: string;
    overwrite: boolean;
  }

  export interface SignupRequest {
    name?: string;
    surname?: string;
    roles?: string[];
    email?: string;
    password?: string;
    gender?: Gender;
    unit?: Unit;
  }
}
