
export const APIS_ENDPOINT_ROOT = "http://localhost:8080";

export const APIS_ENDPOINTS = {
  auth: {
    login: {
      route: `${APIS_ENDPOINT_ROOT}/auth/login`,
      method: "POST",
    },
    verifySession: {
      route: `${APIS_ENDPOINT_ROOT}/auth/verify`,
      method: "GET"
    }
  },
  news: {
    pages: {
      route: `${APIS_ENDPOINT_ROOT}/news`,
      method: "GET"
    },
    newest: {
      route: `${APIS_ENDPOINT_ROOT}/news/newest`,
      method: "GET",
    },
    newDetails: {
      route: `${APIS_ENDPOINT_ROOT}/news/details`,
      method: "GET",
    },
  }
};
