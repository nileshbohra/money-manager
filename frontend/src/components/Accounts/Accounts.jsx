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
	deleteAccount,
} from "../../features/accounts/accountsSlice";

const Accounts = () => {
	const accounts = useSelector((state) => state.accounts.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isAddModal = location.pathname === "/accounts/add";
	const isEditModal = !!location.pathname.includes("/accounts/edit");
	const [accountForm, setAccountForm] = useState({
		account_name: "",
		balance: "",
	});
	const [editID, setEditID] = useState(null);

	useEffect(() => {
		getAccountsApi()
			.then((params) => {
				dispatch(setAccounts(params));
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
				toast.success("Account created successfully");
			} else if (isEditModal) {
				await updateAccountApi(editID, accountForm);
				toast.success("Account updated successfully");
			}
			setAccountForm({
				account_name: "",
				balance: "",
			});
			setEditID(null);
			navigate("/accounts");
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
	};

	const clearValues = () => {
		setAccountForm({
			account_name: "",
			balance: "",
		});
		setEditID(null);
		navigate("/accounts");
	};

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-800">
				<div className="bg-white w-96 p-6 rounded-md shadow-lg">
					<div className="mb-4">
						<h1 className="text-xl font-bold text-center mb-4">
							Accounts
						</h1>
						<ul>
							{accounts.length > 0 ? (
								accounts.map((account) => (
									<li
										key={account.id}
										className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
									>
										<span className="font-semibold">
											{account.account_name} ({account.balance})
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
								navigate("/accounts/add");
							}}
							className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
						>
							+ Add New Account
						</button>
					</div>
				</div>
			</div>
			{(isAddModal || isEditModal) && (
				<Modal
					showModal={isAddModal || isEditModal}
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
