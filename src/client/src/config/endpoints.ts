
export const CLIENT_HOST_NAME = process.env.NODE_ENV === "production" ? "https://ereforestation.ga" : 
  "http://localhost:3000";

export const APIS_ENDPOINT_ROOT = process.env.NODE_ENV === "production" ? 
  "https://ereforestation.tk" : "http://localhost:8080";

export const APIS_ENDPOINTS = {
  admin: {
    dbBackup: {
      route: `${APIS_ENDPOINT_ROOT}/admin/db/backup`,
      method: "GET",
    },
    dbRestore: {
      route: `${APIS_ENDPOINT_ROOT}/admin/db/restore`,
      method: "POST",
    },
    imagesBackup: {
      route: `${APIS_ENDPOINT_ROOT}/admin/images/backup`,
      method: "GET",
    },
    imagesRestore: {
      route: `${APIS_ENDPOINT_ROOT}/admin/images/restore`,
      method: "POST",
    },
    testing: {
      route: `${APIS_ENDPOINT_ROOT}/admin/test`,
      method: "GET",
    },
  },
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
    updateNews: {
      route: `${APIS_ENDPOINT_ROOT}/news`,
      method: "PUT",
    },
    deleteNews: {
      route: `${APIS_ENDPOINT_ROOT}/news`,
      method: "DELETE",
    }
  },
  events: {
    getEvents: {
      route: `${APIS_ENDPOINT_ROOT}/event`,
      method: "GET",
    },
    createEvent: {
      route: `${APIS_ENDPOINT_ROOT}/event`,
      method: "POST",
    },
    getEventDetails: {
      route: `${APIS_ENDPOINT_ROOT}/event/details`,
      method: "GET",
    },
    updateEvent: {
      route: `${APIS_ENDPOINT_ROOT}/event`,
      method: "PUT",
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
  },
  staticFiles: {
    route: `${APIS_ENDPOINT_ROOT}/images`,
    method: "GET",
  }
};
