import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import App from "./App.jsx";
import Analysis from "./components/Analysis/Analysis.jsx";
import Accounts from "./components/Accounts/Accounts.jsx";
import Category from "./components/Category/Category.jsx";
import Transactions from "./components/Transactions/Transactions.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import Home from "./components/Home/Analysis.jsx";

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

export default router;
