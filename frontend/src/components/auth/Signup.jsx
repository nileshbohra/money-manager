import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/auth";
import { toast } from "sonner";
import GoogleLoginButton from "./GoogleLoginButton";

const Signup = () => {
	const [signupForm, setSignupForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChangeSignup = (e) => {
		let { name, value } = e.target;
		setSignupForm({
			...signupForm,
			[name]: value,
		});
	};

	const handleSignup = (e) => {
		e.preventDefault();

		const payload = {
			username: signupForm.username,
			email: signupForm.email,
			password: signupForm.password,
		};

		registerApi(payload)
			.then((res) => {
				console.log(res);
				if (res.success) {
					toast.success("Sign-Up Successful");
					navigate("/login");
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
				<h2 className="text-2xl font-semibold text-center mb-6">
					Sign Up
				</h2>
				<form onSubmit={handleSignup}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="username"
							id="username"
							name="username"
							className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={signupForm.username}
							onChange={handleChangeSignup}
							required
						/>
					</div>
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
							className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={signupForm.email}
							onChange={handleChangeSignup}
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
							className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={signupForm.password}
							onChange={handleChangeSignup}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
					>
						Sign Up
					</button>
				</form>
				<div className="flex items-center justify-between mt-4 mb-4">
					<hr className="w-full border-gray-300" />
					<span className="mx-2 text-gray-500">or</span>
					<hr className="w-full border-gray-300" />
				</div>
				<GoogleLoginButton />
				<p className="mt-4 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
