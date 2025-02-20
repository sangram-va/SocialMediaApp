import { createRoot } from "react-dom/client";
import App from "./App";
import Context from "./Context/Context";

createRoot(document.getElementById('root')).render(<Context><App></App></Context>)