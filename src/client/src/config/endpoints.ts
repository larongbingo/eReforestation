
export const CLIENT_HOST_NAME = process.env.NODE_ENV === "production" ? "https://ereforestation.ga" : "localhost:3000";

export const APIS_ENDPOINT_ROOT = process.env.NODE_ENV === "production" ? 
  "https://ereforestation.tk" : "http://localhost:8080";

export const APIS_ENDPOINTS = {
  auth: {
    login: {
      route: `${APIS_ENDPOINT_ROOT}/auth`,
      method: "POST",
    },
    verifySession: {
      route: `${APIS_ENDPOINT_ROOT}/auth/verify`,
      method: "GET"
    },
    logout: {
      route: `${APIS_ENDPOINT_ROOT}/auth`,
      method: "PUT",
    },
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
    newsDetails: {
      route: `${APIS_ENDPOINT_ROOT}/news/details`,
      method: "GET",
    },
    createNews: {
      route: `${APIS_ENDPOINT_ROOT}/news`,
      method: "POST",
    },
  },
  events: {
    getEvents: {
      route: `${APIS_ENDPOINT_ROOT}/event`,
      method: "GET",
    }
  },
  permission: {
    getPermission: {
      route: `${APIS_ENDPOINT_ROOT}/permission`,
      method: "GET",
    },
  },
  gallery: {
    upload: {
      route: `${APIS_ENDPOINT_ROOT}/gallery/image`,
      method: "POST",
    }
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
    },
    registerCredentialsAndDetails: {
      route: `${APIS_ENDPOINT_ROOT}/user/new`,
      method: "POST",
    }
  }
};
