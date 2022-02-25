import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import 'flowbite';

// APP
import App from "./App";
import './index.css';

const rootElement = document.getElementById("root");

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
  	rootElement
);