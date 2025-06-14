import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Analysis from "./components/Analysis/Analysis.jsx";
import Accounts from "./components/Accounts/Accounts.jsx";
import Category from "./components/Category/Category.jsx";
import Transactions from "./components/Transactions/Transactions.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import Home from "./components/Home/Analysis.jsx";
import "./index.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import {
	Route,
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "sonner";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<Home />}></Route>
			<Route path="analysis" element={<Analysis />} />
			<Route path="category/*" element={<Category />} />
			<Route path="transactions" element={<Transactions />} />
			<Route path="accounts/*" element={<Accounts />} />
			<Route path="signup" element={<Signup />} />
			<Route path="login" element={<Login />} />
			<Route path="logout" element={<Login />} />
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Toaster richColors />
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</StrictMode>
);
