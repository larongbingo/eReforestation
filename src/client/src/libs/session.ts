import { APIS_ENDPOINTS } from "../config/endpoints";

const SESSION_KEY = "SESSION";

export function getSessionKey(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function storeSessionKey(session: string) {
  localStorage.setItem(SESSION_KEY, session );
}

export function destroySessionKey() {
  localStorage.removeItem(SESSION_KEY);
}

export function verifySessionKey() {
  return fetch(APIS_ENDPOINTS.auth.verifySession.route, {
    method: APIS_ENDPOINTS.auth.verifySession.method,
    headers: {
      Authorization: `Bearer ${getSessionKey()}`,
    },
  })
}
