import React, { useEffect } from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// import $ from "jquery";
// import 'foundation-sites/dist/js/foundation.js'

// CSS
// import 'foundation-sites/dist/css/foundation-float.css';
// import 'ebi-framework/css/ebi-global.css';
// import 'ebi-framework/css/theme-embl-petrol.css';
import "EBI-Icon-fonts/fonts.css";
import "./App.css";

import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  // uri: 'https://wp-np3-af.ebi.ac.uk/gp/api/',
});

function App() {
  // useEffect(() => {
  //     $(document).foundation();
  // },[]);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
