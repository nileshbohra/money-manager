import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../features/authToken/authTokenSlice";
import { loginApi, logoutApi } from "../../api/auth";
import { toast } from "sonner";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const path = window.location.pathname;

	useEffect(() => {
		if (path === "/logout") {
			logoutApi().then((res) => {
				if (!!res.success) {
					toast.success("Logout Successful");
					dispatch(setIsAuthenticated(false));
					navigate("/login");
				} else {
					toast.error(res);
				}
			});
		}
	}, []);

	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const handleChangeLogin = (e) => {
		const { name, value } = e.target;
		setLoginForm({
			...loginForm,
			[name]: value,
		});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const payload = {
			email: loginForm.email,
			password: loginForm.password,
		};

		loginApi(payload)
			.then((res) => {
				if (!!res.success) {
					toast.success("Login Successful");
					dispatch(setIsAuthenticated(true));
					navigate("/");
				} else {
					toast.info(res);
				}
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-800">
			<div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-center mb-6 text-black">
					Login
				</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={loginForm.email}
							onChange={handleChangeLogin}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={loginForm.password}
							onChange={handleChangeLogin}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
					>
						Login
					</button>
				</form>
				<div className="flex items-center justify-between mt-4 mb-4">
					<hr className="w-full border-gray-300" />
					<span className="mx-2 text-gray-500">or</span>
					<hr className="w-full border-gray-300" />
				</div>
				<div className="w-full">
					<GoogleLoginButton />
				</div>
				<p className="mt-4 text-center text-gray-600">
					Don’t have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-500 hover:underline"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
