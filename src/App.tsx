import { BrowserRouter } from "react-router-dom";
import "EBI-Icon-fonts/fonts.css";
import "./App.css";
import Layout from "@/components/Layout";
import { config } from "@/config";

function App() {
  return (
    <BrowserRouter basename={config.basename}>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
