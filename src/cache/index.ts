import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const uri = import.meta.env.VITE_GITHUB_URI;

if (!uri)
  throw Error(
    "Please add Github URI as variable to .env.local like VITE_GITHUB_URI=<key>"
  );

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_GITHUB_KEY;
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { client };
