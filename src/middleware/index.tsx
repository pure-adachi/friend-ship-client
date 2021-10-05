import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Forwarded-User": localStorage.getItem("access_token"),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
