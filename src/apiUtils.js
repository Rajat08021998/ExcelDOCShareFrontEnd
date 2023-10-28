import { API_URL_LOCAL, API_URL_PROD } from "./apiconfigs";


export function getApiUrl() {
  if (process.env.NODE_ENV === "development") {
    return API_URL_LOCAL; // Use local API URL during development
  } else {
    return API_URL_PROD; // Use production API URL by default
  }
}
