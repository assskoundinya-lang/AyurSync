import api, { setToken } from './api';

export async function signup(username: string, email: string, password: string) {
  const { data } = await api.post('/auth/signup', { username, email, password });
  setToken(data.token);
  if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
}

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  setToken(data.token);
  if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  setToken(null);
  localStorage.removeItem('user');
}