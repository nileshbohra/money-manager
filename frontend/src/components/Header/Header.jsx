import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkLoginApi } from "../../api/auth";
import { setIsAuthenticated } from "../../features/authToken/authTokenSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state) => state.authToken.isAuthenticated
	);
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);

	useEffect(() => {
		checkLoginApi().then((res) => {
			if (res.success) {
				dispatch(setIsAuthenticated(true));
			} else {
				dispatch(setIsAuthenticated(false));
			}
		});
	}, []);
	return (
		<nav className="flex justify-center bg-black text-white px-8 md:px-16 lg:px-24">
			<div className="container py-2 flex justify-between items-center">
				<div className="text-2xl font-bold hidden md:inline">
					Money Manager
				</div>
				<div className="space-x-6">
					<ul className="flex space-x-8">
						{/* <li className="hover:text-gray-400">
							<Link to="/">Home</Link>
						</li> */}
						<li className="hover:text-gray-400">
							<Link to="/analysis">Analysis</Link>
						</li>
						<li className="hover:text-gray-400">
							<Link to="/transactions">Transactions</Link>
						</li>
						<li className="hover:text-gray-400">
							<Link to="/category">Categories</Link>
						</li>
						<li className="hover:text-gray-400">
							<Link to="/accounts">Accounts</Link>
						</li>
						{!isAuthenticated && (
							<li className="hover:text-gray-400">
								<Link to="/login">Login</Link>
							</li>
						)}
					</ul>
				</div>

				{!!isAuthenticated && (
					<div className="flex items-center space-x-4">
						<div className="relative">
							<div
								className="flex items-center cursor-pointer"
								onClick={() =>
									setShowProfileDropdown(!showProfileDropdown)
								}
							>
								<img
									src="https://avatar.iran.liara.run/public/17"
									alt="User Avatar"
									className="w-10 h-10 rounded-full object-cover"
								/>
								<span className="ml-2 hidden md:inline"></span>
							</div>
							<div
								className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg group-hover:block z-50"
								style={{
									display: showProfileDropdown
										? "block"
										: "none",
								}}
							>
								<ul>
									<li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
										<Link to="/profile">My Profile</Link>
									</li>
									<li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
										<Link to="/settings">Settings</Link>
									</li>
									<li className="px-4 py-2 hover:bg-gray-200 rounded-lg">
										<Link to="/logout">Logout</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
