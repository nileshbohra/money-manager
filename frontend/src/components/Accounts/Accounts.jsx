import React, { useState, useEffect } from "react";
import {
	getAccountsApi,
	updateAccountApi,
	createAccountApi,
	deleteAccountApi,
} from "../../api/account";
import Modal from "./Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import {
	setAccounts,
	addAccount,
	editAccount,
	deleteAccount,
} from "../../features/accounts/accountsSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Accounts = () => {
	const accounts = useSelector((state) => state.accounts.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isAddModal = location.pathname === "/accounts/add";
	const isEditModal = !!location.pathname.includes("/accounts/edit");
	const [showModal, setShowModal] = useState(false);
	const [accountForm, setAccountForm] = useState({
		account_name: "",
		balance: "",
	});
	const [editID, setEditID] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAccountsApi()
			.then((params) => {
				dispatch(setAccounts(params));
				setIsLoading(false);
			})
			.catch((err) => {
				navigate("/login");
				console.error("Error fetching accounts: ", err);
			});
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAccountForm({ ...accountForm, [name]: value });
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			if (isAddModal) {
				await createAccountApi(accountForm);
				dispatch(addAccount(accountForm));
				toast.success("Account created successfully");
			} else if (isEditModal) {
				await updateAccountApi(editID, accountForm);
				dispatch(editAccount({ id: editID, ...accountForm }));
				toast.success("Account updated successfully");
			}
			setAccountForm({
				account_name: "",
				balance: "",
			});
			setEditID(null);
			setShowModal(false);
		} catch (error) {
			console.error("Error saving account:", error);
			toast.error("Error saving account");
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteAccountApi(id);
			dispatch(deleteAccount(id));
			toast.success("Account deleted successfully", {
				icon: "🗑️",
				richColors: false,
			});
		} catch (error) {
			console.error("Error deleting account:", error);
			toast.error("Error deleting account");
		}
	};

	const handleEdit = (id) => {
		const account = accounts.find((account) => account.id === id);
		setAccountForm({
			account_name: account.account_name,
			balance: account.balance,
		});
		setEditID(id);
		navigate(`/accounts/edit/${id}`);
		setShowModal(true);
	};

	const clearValues = () => {
		setAccountForm({
			account_name: "",
			balance: "",
		});
		setEditID(null);
		setShowModal(false);
	};

	return (
		<>
			{isLoading ? (
				<DotLottieReact
					height={100}
					src="https://lottie.host/9b6f79c5-2c2a-43e8-b023-93ef8cfd2a9d/rYqDswSMIi.lottie"
					loop
					autoplay
				/>
			) : (
				<div className="min-h-screen flex items-center justify-center bg-gray-800">
					<div className="bg-white w-96 p-6 rounded-md shadow-lg">
						<div className="mb-4">
							<h1 className="text-xl font-bold text-center mb-4">
								Accounts
							</h1>
							<ul>
								{accounts.length > 0 ? (
									accounts.map((account, index) => (
										<li
											key={index}
											className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
										>
											<span className="font-semibold">
												{account.account_name} (
												{account.balance})
											</span>
											<div className="flex space-x-4">
												<FaEdit
													className="text-blue-500 cursor-pointer"
													onClick={() =>
														handleEdit(account.id)
													}
												/>
												<FaTrashAlt
													className="text-red-500 cursor-pointer"
													onClick={() =>
														handleDelete(account.id)
													}
												/>
											</div>
										</li>
									))
								) : (
									<p className="text-center text-gray-500">
										No accounts added yet.
									</p>
								)}
							</ul>
						</div>

						<div className="text-center mt-6">
							<button
								onClick={() => {
									setShowModal(true);
									navigate("/accounts/add");
								}}
								className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
							>
								+ Add New Account
							</button>
						</div>
					</div>
				</div>
			)}
			{showModal && (
				<Modal
					headingText={`${
						!!isAddModal ? "Add New Account" : "Edit Account"
					}`}
					setAccountForm={setAccountForm}
					accountForm={accountForm}
					handleSave={handleSave}
					clearValues={clearValues}
					handleChange={handleChange}
				/>
			)}
		</>
	);
};

export default Accounts;
