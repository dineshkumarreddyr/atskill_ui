import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./Root";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/fonts/simple-line-icons/css/simple-line-icons.css";
import "./assets/fonts/iconsmind/style.css";

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
