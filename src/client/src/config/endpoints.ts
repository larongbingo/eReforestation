
export const APIS_ENDPOINT_ROOT = "http://localhost:8080";

export const APIS_ENDPOINTS = {
  auth: {
    login: {
      route: `${APIS_ENDPOINT_ROOT}/auth/login`,
      method: "POST",
    },
  }
};
