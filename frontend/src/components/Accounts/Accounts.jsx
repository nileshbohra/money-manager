import React, { useState, useEffect } from "react";
import {
	getAccounts,
	updateAccount,
	createAccount,
	deleteAccount,
} from "../../api/account";

const Accounts = () => {
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		const fetchAccounts = async () => {
			try {
				const response = await getAccounts();
				setAccounts(response);
			} catch (error) {
				console.error("Error fetching accounts:", error);
			}
		};
		fetchAccounts();
	}, []);
	return <div>{accounts}</div>;
};

export default Accounts;
