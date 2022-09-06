import { createRoot } from "react-dom/client";
import './index.css';
import {Org} from './Org';
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Router basename="/">
    <Org />
  </Router>
)