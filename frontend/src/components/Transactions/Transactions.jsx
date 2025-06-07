import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setTransactions,
	addTransaction,
	editTransaction,
	deleteTransaction,
} from "../../features/transaction/transactionSlice";
import TransactionTable from "./TransactionTable";
import { setCategories } from "../../features/category/categorySlice";
import { setAccounts } from "../../features/accounts/accountsSlice";
import TransactionFilter from "./TransactionFilter";
import { useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../../api/category";
import { getAccountsApi } from "../../api/account";
import {
	getTransactionsApi,
	addTransactionApi,
	deleteTransactionApi,
} from "../../api/transactions";
import { toast } from "sonner";

const Transactions = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const accounts = useSelector((state) => state.accounts.value);
	const transactions = useSelector((state) => state.transaction.value);
	const categories = useSelector((state) => state.category.value);
	const [filterCategoryID, setFilterCategoryID] = useState("");

	const [transactinoform, setTransactionForm] = useState({
		categoryID: "",
		accountID: "",
		amount: "",
		transactionType: {
			income: false,
			expense: false,
		},
		description: "",
	});
	const [editID, setEditID] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			await getCategoriesApi()
				.then((params) => {
					dispatch(setCategories(params));
				})
				.catch((err) => {
					console.error("Error fetching categories:", err);
					navigate("/login");
				});
		};
		const fetchAccounts = async () => {
			await getAccountsApi()
				.then((params) => {
					dispatch(setAccounts(params));
				})
				.catch((err) => {
					console.error("Error fetching accounts:", err);
					navigate("/login");
				});
		};
		const fetchTransactions = async () => {
			await getTransactionsApi()
				.then((params) => {
					dispatch(setTransactions(params.data));
				})
				.catch((err) => {
					console.error("Error fetching transactions:", err);
					navigate("/login");
				});
		};

		const fetchAllData = async () => {
			try {
				await Promise.all([
					fetchCategories(),
					fetchAccounts(),
					fetchTransactions(),
				]);
			} catch (err) {
				console.error(err);
				navigate("/login");
			}
		};
		fetchAllData();
	}, []);

	const addNewTransaction = async () => {
		try {
			if (
				!!transactinoform.amount &&
				(transactinoform.transactionType.income ||
					transactinoform.transactionType.expense)
			) {
				addTransactionApi(transactinoform)
					.then((params) => {
						let data = params;

						data = {
							...data,
							transactionType: {
								income:
									data.transactionType == "income"
										? true
										: false,
								expense:
									data.transactionType == "expense"
										? true
										: false,
							},
						};
						dispatch(addTransaction(data));
					})
					.catch((err) => {
						console.error("Error adding transaction:", err);
					});
			} else {
				toast.error("All Fields are mendatrory");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (e) => {
		const { name, type, value, checked } = e.target;

		if (type == "checkbox") {
			setTransactionForm((prevForm) => ({
				...prevForm,
				transactionType: {
					income: name == "income" ? true : false,
					expense: name == "expense" ? true : false,
				},
			}));
		} else {
			setTransactionForm((prevForm) => ({
				...prevForm,
				[name]: type === "number" ? value : value,
			}));
		}
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (!!editID) saveEdited(editID);
		else addNewTransaction();
		clearValues();
	};

	const saveEdited = (id) => {
		let tran = {
			id: id,
			categoryID: transactinoform.categoryID,
			accountID: transactinoform.accountID,
			amount: transactinoform.amount,
			type: !!transactinoform.transactionType.income
				? "income"
				: "expense",
			description: transactinoform.description,
		};
		dispatch(editTransaction(tran));
	};

	const handleEdit = useCallback((id) => {
		setEditID(id);
		let currTransaction = transactions.find(
			(transaction) => id === transaction.id
		);
		setTransactionForm({
			categoryID: currTransaction.id,
			amount: currTransaction.amount,
			categoryType: {
				income: currTransaction.type == "income" ? true : false,
				expense: currTransaction.type == "expense" ? true : false,
			},
			description: currTransaction.description,
		});
		setShowModal(true);
	}, []);

	const clearValues = () => {
		setTransactionForm({
			categoryID: "",
			amount: "",
			transactionType: {
				income: false,
				expense: false,
			},
			description: "",
		});
		setShowModal(false);
	};

	const handleDelete = useCallback(
		async (id) => {
			deleteTransactionApi(id)
				.then((params) => {
					dispatch(deleteTransaction(id));
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[transactions]
	);

	const onFilter = () => {};

	const filteredTransactions = useMemo(() => {
		if (!!filterCategoryID)
			return transactions.filter(
				(tran) => tran.category_id == filterCategoryID
			);
		return transactions;
	}, [filterCategoryID, transactions]);

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-800">
				<div className="fixed bottom-4 right-4 md:bottom-6 md:right-6">
					<button
						onClick={() => setShowModal(true)}
						className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 w-full md:w-auto"
					>
						+ Add New Transaction
					</button>
				</div>
				<div className="bg-white w-full md:w-8/12 p-6 rounded-md shadow-lg">
					<div className="mb-4">
						<h1 className="text-xl font-bold text-center mb-4">
							Transactions
						</h1>
						<div className="w-2/4 mt-10">
							<TransactionFilter
								categories={categories}
								filterCategoryID={filterCategoryID}
								setFilterCategoryID={setFilterCategoryID}
								onFilter={onFilter}
							/>
						</div>
						<ul>
							{transactions.length > 0 ? (
								<TransactionTable
									accounts={accounts}
									categories={categories}
									transactions={filteredTransactions}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							) : (
								<p className="text-center text-gray-500">
									No Transactions added yet.
								</p>
							)}
						</ul>
					</div>
				</div>
			</div>
			{showModal && (
				<div
					className="relative z-10"
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true"
				>
					{/* Background overlay */}
					<div
						className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
						aria-hidden="true"
					></div>
					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 sm:p-0">
							<div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full">
								<div className="p-6">
									<h1 className="text-xl font-bold text-gray-800 mb-4">
										Add New Transaction
									</h1>
									<form onSubmit={handleSave}>
										<div className="flex items-center space-x-4 mb-4">
											<div className="flex items-center">
												<input
													onChange={handleChange}
													checked={
														transactinoform
															.transactionType
															.income
													}
													type="checkbox"
													name="income"
													id="income"
													className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												/>
												<label
													htmlFor="income"
													className="ml-2 text-gray-700"
												>
													Income
												</label>
											</div>
											<div className="flex items-center">
												<input
													onChange={handleChange}
													checked={
														transactinoform
															.transactionType
															.expense
													}
													type="checkbox"
													name="expense"
													id="expense"
													className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												/>
												<label
													htmlFor="expense"
													className="ml-2 text-gray-700"
												>
													Expense
												</label>
											</div>
										</div>

										<div className="mb-6">
											<select
												onChange={handleChange}
												name="categoryID"
												className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											>
												<option>
													Select Option...
												</option>
												{categories.map(
													(category, index) => (
														<option
															key={index}
															value={category.id}
														>
															{
																category.category_name
															}
														</option>
													)
												)}
											</select>
										</div>

										<div className="mb-6">
											<label
												htmlFor="accountID"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Select Account
											</label>
											<select
												onChange={handleChange}
												name="accountID"
												id="accountID"
												className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											>
												<option>
													Select Option...
												</option>
												{accounts.map(
													(account, index) => (
														<option
															key={index}
															value={account.id}
														>
															{
																account.account_name
															}
														</option>
													)
												)}
											</select>
										</div>

										{/* Input for Transaction Amount */}
										<div className="mb-6">
											<input
												value={transactinoform.amount}
												onChange={handleChange}
												type="text"
												name="amount"
												placeholder="Transaction Amount"
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
											/>
										</div>
										{/* Description for transaction*/}
										<div className="mb-6">
											<label
												htmlFor="description"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Transaction Description
											</label>
											<textarea
												id="description"
												name="description"
												onChange={handleChange}
												rows="3"
												className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												placeholder="Enter a brief description of the transaction..."
											/>
										</div>

										{/* Buttons */}
										<div className="flex justify-end space-x-4">
											<button
												onClick={clearValues}
												className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
												type="button"
											>
												Cancel
											</button>
											<button
												className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
												type="submit"
											>
												Save
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Transactions;
