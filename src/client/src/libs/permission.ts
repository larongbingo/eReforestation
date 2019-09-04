import { APIS_ENDPOINTS } from "../config/endpoints";
import { getSessionKey } from "./session";

const PERMISSION_KEY = "PERMISSION";

export async function storeUserPermission() {
  const permissionRes = await fetch(APIS_ENDPOINTS.permission.getPermission.route, {
    method: APIS_ENDPOINTS.permission.getPermission.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });

  const permission = await permissionRes.json();

  localStorage.setItem(PERMISSION_KEY, permission);

  console.log(permission);
}

export function getUserPermission() {
  return localStorage.getItem(PERMISSION_KEY);
}

export function deleteUserPermission() {
  localStorage.setItem(PERMISSION_KEY, "");
}
