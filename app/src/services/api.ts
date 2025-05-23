import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "@/payload-api"; // generated by openapi-typescript

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return "http://localhost:3000";
};

export const fetchClient = createFetchClient<paths>({
  baseUrl: getBaseUrl(),
});
export const API = createClient(fetchClient);

export default API;
