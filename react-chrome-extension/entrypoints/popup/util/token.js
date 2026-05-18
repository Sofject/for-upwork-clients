import { jwtDecode } from 'jwt-decode';
import { storage } from 'wxt/storage';

export function isJwtExpired(token) {
  let isJwtexpired = false;
  const { exp } = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  if (currentTime > exp) isJwtexpired = true;

  return isJwtexpired;
}

export async function getAuthToken() {
  const authToken = await storage.getItem('local:authToken');
  return authToken;
}

export async function setAuthToken(token) {
  await storage.setItem('local:authToken', token)
}

export async function removeAuthToken() {
  await storage.removeItem('local:authToken')
}
