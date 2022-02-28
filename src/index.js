import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'flowbite';

// PROVIDERS
import { AuthProvider } from './providers/auth.provider.js';

// APP
import App from "./App";
import './index.css';

const rootElement = document.getElementById("root");

render(
	<BrowserRouter>
		<AuthProvider>
			<App/>
		</AuthProvider>
	</BrowserRouter>,
  	rootElement
);