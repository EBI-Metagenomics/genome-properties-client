import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "EBI-Icon-fonts/fonts.css";
import "./App.css";
import Layout from "./components/Layout";
import { config } from "./config";

const client = new ApolloClient({
  uri: config.api,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename={config.basename}>
        <Layout />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
