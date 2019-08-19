
export const APIS_ENDPOINT_ROOT = process.env.NODE_ENV === "production" ? 
  "https://thatonenoob.gq" : "http://localhost:8080";

export const APIS_ENDPOINTS = {
  auth: {
    login: {
      route: `${APIS_ENDPOINT_ROOT}/auth`,
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
  },
  user: {
    register: {
      route: `${APIS_ENDPOINT_ROOT}/user`,
      method: "POST",
    },
    userDetailsCreation: {
      route: `${APIS_ENDPOINT_ROOT}/user/details`,
      method: "PUT",
    },
    contactPersonCreation: {
      route: `${APIS_ENDPOINT_ROOT}/user/contact-person`,
      method: "PUT",
    },
    getUserDetails: {
      route: `${APIS_ENDPOINT_ROOT}/user/details`,
      method: "GET",
    },
    getContactPerson: {
      route: `${APIS_ENDPOINT_ROOT}/user/contact-person`,
      method: "GET",
    }
  }
};
