import React, { useEffect } from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "EBI-Icon-fonts/fonts.css";
import "./App.css";

import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import config from "config.json";

const client = new ApolloClient({
  uri: config.api,
  // uri: 'https://wp-np3-af.ebi.ac.uk/gp/api/',
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
