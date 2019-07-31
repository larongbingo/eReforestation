import { APIS_ENDPOINTS } from "../../config/endpoints";
import { getSessionKey } from "../../libs/session";

export async function getUserDetails() {
  return fetch(APIS_ENDPOINTS.user.getUserDetails.route, {
    method: APIS_ENDPOINTS.user.getUserDetails.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}

export async function getContactPerson() {
  return fetch(APIS_ENDPOINTS.user.getContactPerson.route, {
    method: APIS_ENDPOINTS.user.getContactPerson.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}
