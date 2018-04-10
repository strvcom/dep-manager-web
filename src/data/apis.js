// @flow
import client from "../apolloClient";
import { REPOSITORIES_QUERY } from "./queries";
import refineData from "./helpers";

export const getRepositories = (query: string) =>
  client
    .query({
      query: REPOSITORIES_QUERY,
      variables: {
        query
      }
    })
    .then(({ data }) => refineData(data));
