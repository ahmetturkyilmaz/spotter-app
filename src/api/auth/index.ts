import {AUTH_API} from '../config';
import {Auth} from './types';

export async function loginUser(authConcept: Auth.LoginRequest) {
  const {data} = await AUTH_API.post<Auth.LoginRootResponse>('/auth/signin', authConcept);
  return data;
}

export async function refreshToken(payload: {refreshToken: string | null}) {
  const {data} = await AUTH_API.post<Auth.LoginRootResponse>('/auth/refresh', undefined, {
    /**
     * API requirement:
     * refresh endpoint requires refresh token instead of the expired auth token
     */
    headers: {Authorization: `Bearer ${payload.refreshToken}`},
  });
  return data;
}

export async function logout(auth: string, refresh: string) {
  const {data} = await AUTH_API.post('/auth/logout', undefined, {
    headers: {
      refresh,
      auth,
    },
  });
  return data;
}

export async function registerUser(authConcept: Auth.SignupRequest) {
  const {data} = await AUTH_API.post<Auth.LoginRootResponse>('/auth/signup', authConcept);
  return data;
}
