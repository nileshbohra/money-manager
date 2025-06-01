import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { memo } from "react";

const TransactionTable = ({
	categories,
	accounts,
	transactions,
	handleEdit,
	handleDelete,
}) => {
	const categoryName = (id) => {
		const category = categories.find((category) => category.id === id);
		return category ? category.category_name : "Unknown";
	};
	const accountName = (id) => {
		const account = accounts.find((account) => account.id === id);
		return account ? account.account_name : "Unknown";
	};

	return (
		<table className="min-w-full bg-white border-collapse">
			<thead>
				<tr>
					{/* <th className="py-2 px-4 border-b text-left">Account</th> */}
					<th className="py-2 px-4 border-b text-right">Category</th>
					<th className="py-2 px-4 border-b text-right">
						Description
					</th>
					<th className="py-2 px-4 border-b text-right">Amount</th>
					<th className="py-2 px-4 border-b text-right">Account</th>
					<th className="py-2 px-4 border-b text-right">Tran Date</th>
					<th className="py-2 px-4 border-b">Actions</th>
				</tr>
			</thead>
			<tbody>
				{transactions.map((transaction) => (
					<tr key={transaction.id} className="bg-gray-100">
						{/* <td className="py-2 px-4 border-b">{transaction.account || "avinash"}</td> */}
						<td className="py-2 px-4 border-b text-right">
							{categoryName(transaction.category_id)}
						</td>
						<td className="py-2 px-4 border-b text-right">
							{transaction.description}
						</td>
						<td className="py-2 px-4 border-b text-right">
							{transaction.amount} (
							{transaction.transaction_type == "income"
								? "income"
								: "expense"}
							)
						</td>
						<td className="py-2 px-4 border-b text-right">
							{accountName(transaction.account_id)}
						</td>
						<td className="py-2 px-4 border-b text-right">
							{transaction.createdAt}
						</td>
						<td className="py-2 px-4 border-b">
							<div className="flex justify-end space-x-4">
								<FaEdit
									className="text-blue-500 cursor-pointer"
									onClick={() => handleEdit(transaction.id)}
								/>
								<FaTrashAlt
									className="text-red-500 cursor-pointer"
									onClick={() => handleDelete(transaction.id)}
								/>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default memo(TransactionTable);
