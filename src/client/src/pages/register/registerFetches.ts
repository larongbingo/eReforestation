import { IUserDetails } from "../../../../interfaces/models/IUserDetails";
import { IContactPerson } from "../../../../interfaces/models/IContactPerson";
import { APIS_ENDPOINTS } from "../../config/endpoints";
import { getSessionKey } from "../../libs/session";

export function createUserDetails(userDetails: IUserDetails) {
  return fetch(APIS_ENDPOINTS.user.userDetailsCreation.route, {
    method: APIS_ENDPOINTS.user.userDetailsCreation.method,
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getSessionKey()}`
    }
  });
}

export function createContactPerson(contactPerson: IContactPerson) {
  return fetch(APIS_ENDPOINTS.user.contactPersonCreation.route, {
    method: APIS_ENDPOINTS.user.contactPersonCreation.method,
    body: JSON.stringify(contactPerson),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getSessionKey()}`
    }
  });
}

export function createUserAccount(username: string, password: string) {
  return fetch(APIS_ENDPOINTS.user.register.route, {
    method: APIS_ENDPOINTS.user.register.method,
    body: JSON.stringify({username, password}),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function createUserAccountWithUserDetails(
  accountAndDetails: IUserDetails & { username: string, password: string },
) {
  return fetch(APIS_ENDPOINTS.user.registerCredentialsAndDetails.route, {
    method: APIS_ENDPOINTS.user.registerCredentialsAndDetails.method,
    body: JSON.stringify(accountAndDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
